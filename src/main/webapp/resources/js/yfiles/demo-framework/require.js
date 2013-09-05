/****************************************************************************
 **
 ** This file is part of yFiles for HTML 1.1.0.1.
 ** 
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2013 by yWorks GmbH, Vor dem Kreuzberg 28, 
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
/* This is a simple implementation of the AMD loading mechanism                */
/* This code is part of the demo sources of yFiles for HTML                    */
/* ( http://www.yworks.com/yfileshtml )
/* and is not intended for production use.                                     */
/* We recommend using a third party implementation of the AMD loading standard */
/* like the ones provided by http://dojotoolkit.org or http://requirejs.org    */
(function(window, undefined) {
	var dependencyState = {};
	var jsFileMatcher = /\.js$/;
	var currentlyLoadedModule = null;
	var pathToCurrentlyLoadedModule = {};

	function loadScript(path, context, loader) {
		dependencyState[path] = {
			dependants: [context],
			state: 'pending'
		};
        var script = document.createElement('script');
        var timerId = -1;
        script.type = 'text/javascript';
        script.onload = function() {
            var currentlyLoadedModuleLocal = pathToCurrentlyLoadedModule[path] || currentlyLoadedModule;
            script.onload = undefined;
            dependencyState[path].state = 'loaded';
            if(currentlyLoadedModuleLocal) {
            	currentlyLoadedModuleLocal.dependants = dependencyState[path].dependants;
				currentlyLoadedModuleLocal.name = path;
            	currentlyLoadedModuleLocal.resolve();
            	currentlyLoadedModule = null;
        	} else {
        		var dependants = dependencyState[path].dependants;
        		for(var i = 0; i < dependants.length; i++) {
        			dependants[i].resolve();
        		}
				dependencyState[path].state = 'executed';
        	}
            clearTimeout(timerId);
        };
        script.onerror = function(e) {
            console.log('Error loading '+path, e);
            script.onload = undefined;
            dependencyState[path].state = 'failed';
            // module could not be loaded, resolve dependency anyway
            context.resolve();
            clearTimeout(timerId);
        };
        timerId = setTimeout(function() {
            console.log('Timeout while trying to load '+path);
            script.onload = undefined;
            dependencyState[path].state = 'failed';
            // module could not be loaded, resolve dependency anyway
            context.resolve();
        }, require.timeout);
        script.src = resolvePath(path);
		script['data-yworks-module-path'] = path;
        loader.appendChild(script);
    }

    function resolvePath(path) {
    	if(jsFileMatcher.test(path)) {
    		return path;
    	}
    	return require.baseUrl + path + ".js";
    }

	window.require = function(deps, fn) {
		var anonRequire = {
			unresolvedDependencyCount: 1,
			callback: fn,
			resolve: function() {
				if(--this.unresolvedDependencyCount == 0) {
					if (window.require.disableErrorReporting){
						this.callback();
					} else {
						try {
							this.callback();
						} catch(e) {
							console.log("Error occured: "+e.message, e.stack, e);
							if(window.yfiles && window.yfiles.demo && window.yfiles.demo.Application) {
								window.yfiles.demo.Application.handleError(e, "", "");
							} else {
								var loader = document.getElementById("loader");
								if(loader && !window.require.disableErrorReporting) {
									loader.innerHTML = "<h1>An error occured, starting the application failed.</h1>"
									 + "<p>Please review the error message in your browsers developer tools.</p>";
									 loader.className += " error";
								}
							}
						}
					}
				}
			}
		};
		for(var i = 0, length = deps.length; i < length; i++) {
			var dependency = deps[i];
			if(dependencyState.hasOwnProperty(dependency)) {
				var module = dependencyState[dependency];
				if(module.state == 'pending'  || module.state == "loaded" || module.state == "resolved") {
					anonRequire.unresolvedDependencyCount++;
					module.dependants.push(anonRequire);
				}
				// else module is already loaded, don't need to do anything
			} else {
				// load dependency
				anonRequire.unresolvedDependencyCount++;
				loadScript(dependency, anonRequire, document.head);
			}
		}
		// make sure that we call the callback if everything is resolved
		anonRequire.resolve();
	};

	window.define = function(modulenameopt, deps, fn) {
		if (typeof modulenameopt !== "string"){
			fn = deps;
			deps = modulenameopt;
			modulenameopt = undefined;
		}
		
		var unresolvedDependencies = 0;
		var clm = currentlyLoadedModule = {
			callback: fn,
			dependants: [],
			dependencyNames: [],
			resolve: function() {
				if(this.unresolvedDependencyCount == 0) {
					dependencyState[this.name].state = "resolved";
					dependencyState[this.name].deps = this.dependencyNames;
					if (window.require.disableErrorReporting){
						this.callback();
						dependencyState[this.name].state = "defined";
					} else {
						try {
							this.callback();
							dependencyState[this.name].state = "defined";
						} catch(e) {
							if(this.name) {
								dependencyState[this.name].state = "failed";
								console.log("Error resolving module "+this.name, e);
							} else {
								console.log(e);
							}
						}
					}
					for(var i = 0; i < this.dependants.length; i++) {
						this.dependants[i].resolve();
					}
				}
				this.unresolvedDependencyCount--;
			}
		};
		if (modulenameopt){
			pathToCurrentlyLoadedModule[modulenameopt] = currentlyLoadedModule;
			currentlyLoadedModule = null;
		} else {
			// no name set - shit - find out name for IE..
			var children = document.head.children;
			for (var i = 0; i < children.length; i++){
				var child = children[i];
				if (child.src && child.readyState == "interactive"){
					var path = child['data-yworks-module-path'];
					if (path){
						pathToCurrentlyLoadedModule[path] = clm;
						currentlyLoadedModule = null;
						break;
					}
				}
			}
		}
		
		for(var i = 0, length = deps.length; i < length; i++) {
			var dependency = deps[i];
			if(dependencyState.hasOwnProperty(dependency)) {
				var module = dependencyState[dependency];
				if(module.state == 'pending' || module.state == "loaded" || module.state == "resolved") {
					unresolvedDependencies++;
					module.dependants.push(clm);
				}
				// else module is already loaded, don't need to do anything
			} else {
				// load dependency
				unresolvedDependencies++;
				loadScript(dependency, clm, document.head);
			}
			clm.dependencyNames.push(dependency);
		}
		// there are unresolved dependencies
		clm.unresolvedDependencyCount = unresolvedDependencies;
	};

	// some configuration
	require.timeout = 400000;
	require.baseUrl = '';
	require.load = require;
	require.disableErrorReporting = false;
	require.getRequiredModuleStates = function() {
		var modules = [];
		Object.getOwnPropertyNames(dependencyState).forEach(function(moduleName) {
			var state = dependencyState[moduleName];
			var info = { name: moduleName, state: state.state, dependencies:[] };
			if (state.deps){
				for(var i = 0; i < state.deps.length; i++) {
					info.dependencies.push(state.deps[i]);
				}
			}
			modules.push(info);
		});
		return modules;
	};
}(window));