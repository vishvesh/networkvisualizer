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
(typeof define=='function'?define:(function(dependencies,f){f();}))(['yfiles/lang'],function(){
yfiles.module("yfiles.demo", function(exports) {
  /**
   * Base class for yFiles for HTML demo applications.
   * @class yfiles.demo.Application
   */
  /*public*/ /*abstract*/ exports.Application = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.Application.prototype */
    return {
      '$abstract': true,
      
      /**
       * Called after this application has been set up by the demo framework.
       */
      'loaded': yfiles.lang.Abstract,
      
      /**
       * Registers the Javascript commands for the GUI elements, typically the
       * tool bar buttons, during the creation of this application.
       */
      'registerCommands': function() {},
      
      'setProperty': function(/*string*/ name, /*Object*/ value) {
        yfiles.demo.ApplicationExtensions.setProperty(this, name, value);
      },
      
      /** @return {Object} */
      'getProperty': function(/*string*/ name) {
        return yfiles.demo.ApplicationExtensions.getProperty(this, name);
      },
      
      'setTitle': function(/*string*/ title) {
        yfiles.demo.ApplicationExtensions.setTitle(this, title);
      },
      
      /** @lends yfiles.demo.Application */
      '$static': {
        /**
         * Starts the creation of the given yFiles for HTML demo application.
         * This method creates the GUI widgets specified in the base HTML file,
         * then invokes {@link yfiles.demo.Application#registerCommands} and finally
         * {@link yfiles.demo.Application#loaded}.
         * @param {yfiles.demo.Application} application The demo application to create.
         * @param {Object} appRootOrId The root element of the application, either the element itself or its ID.
         * @param {Object} config Configuration settings.
         */
        'start': function(/*yfiles.demo.Application*/ application, /*Object*/ appRootOrId, /*Object*/ config) {
          var /*string*/ catchErrors = /*(string)*/config["catchErrors"];
          if ("true".equals(catchErrors)) {
            yfiles.system.ErrorHandling.catchErrors = true;
            yfiles.system.ErrorHandling.errorHandler = function(/*Object*/ e) {
              yfiles.demo.Application.handleError(e, "", 0);
            };
          }

          var /*Element*/ appRoot;
          if (yfiles.lang.String.$class.isInstance(appRootOrId)) {
            appRoot = document.getElementById(/*(string)*/appRootOrId);
          } else {
            appRoot = /*(Element)*/appRootOrId;
          }
          var /*yfiles.demo.IApplicationParserBackend*/ backend = yfiles.demo.BackendFactory.getBackend(/*(string)*/config["backend"]);
          window.onerror = yfiles.demo.Application.handleError;
          //Runtime.window.onbeforeunload = e => { return "You are about to leave the demo. Are you sure you want to exit?"; };
          var /*system.Action*/ callback = function() {
            try {
              var /*yfiles.demo.ApplicationParser*/ appConverter = yfiles.demo.Application.initializer(new yfiles.demo.ApplicationParser(), application, backend);

              var /*yfiles.demo.IApplicationFrame*/ frame = appConverter.parseApplication(appRoot);
              var loaderId = config["loaderId"];
              if (!"undefined".equals(typeof(loaderId))) {
                (/*(HTMLElement)*/document.getElementById(/*(string)*/loaderId)).style.setProperty("display", "none", "");
              }
              application.registerCommands();
              appConverter.bindCommands(frame);
              application.loaded();
              var loadedCallback = config["loadedCallback"];
              if (!"undefined".equals(typeof(loadedCallback))) {
                (/*(system.Action)*/loadedCallback)();
              }
              setTimeout(function() {
                var appStatus = window["yFilesAppStatus"];
                if (appStatus === undefined) {
                  window["yFilesAppStatus"] = "OK";
                }
              }, 10000);
            } catch ( /*Error*/ e ) {
              if (e instanceof Error) {
                yfiles.demo.Application.handleError(e, "", 0);
              } else if (e instanceof yfiles.lang.Exception) {
                yfiles.demo.Application.handleError(e, "", 0);
              } else {
                throw e;
              }
            }
          };
          if ("complete".equals(document.readyState) || "interactive".equals(document.readyState)) {
            callback();
          } else {
            backend.addOnLoadCallback(callback);
          }
        },
        
        /**
         * @return {yfiles.demo.ApplicationParser}
         * @private
         */
        'initializer': function(/*final yfiles.demo.ApplicationParser*/ newApplicationParser, /*yfiles.lang.Object*/ p1, /*yfiles.lang.Object*/ p2) {
          newApplicationParser.application = p1;
          newApplicationParser.backend = p2;
          return newApplicationParser;
        },
        
        /** @return {boolean} */
        'handleError': function(/*Object*/ error, /*string*/ url, /*int*/ lineNumber) {
          // create outer div & form element
          var /*Element*/ formDialog = document.createElement("div");
          yfiles.demo.ElementExtensions.addClass(yfiles.demo.ElementExtensions.addClass(formDialog, "dialog"), "error-dialog");
          var /*Element*/ title = document.createElement("h2");
          (/*(HTMLElement)*/title).innerHTML = "Report error to yWorks";
          formDialog.appendChild(title);
          var /*HTMLFormElement*/ form = /*(HTMLFormElement)*/document.createElement("form");
          form.setAttribute("method", "POST");
          form.setAttribute("target", "_blank");
          form.setAttribute("action", "http://kb.yworks.com/errorFeedback.html");
          var /*EventListener*/ submitHandler = function(/*Event*/ evt) {
            form.submit();
            document.body.removeChild(formDialog);
          };
          var /*EventListener*/ cancelHandler = function(/*Event*/ evt) {
            document.body.removeChild(formDialog);
          };
          formDialog.appendChild(form);

          // create form element
          yfiles.demo.Application.addHiddenField(form, "exact_product", yfiles.productname);
          yfiles.demo.Application.addHiddenField(form, "version", yfiles.version);
          yfiles.demo.Application.addFormRow(form, "email", "E-Mail <span class=\"optional\">In case we need to contact you</span>", "text", "");
          (/*(HTMLTextAreaElement)*/yfiles.demo.Application.addFormRow(form, "system", "System Info", "textarea", "appVersion: " + window.navigator.appVersion + "\nVendor: " + window.navigator.vendor + "\nOS: " + window.navigator.platform + "\nuserAgent: " + window.navigator.userAgent)).rows = 3;
          yfiles.demo.Application.addFormRow(form, "url", "URL", "text", window.location.href);
          if (yfiles.lang.String.$class.isInstance(error)) {
            yfiles.demo.Application.addFormRow(form, "error_message", "Error Message", "text", /*(string)*/error);
            yfiles.demo.Application.addFormRow(form, "file", "File", "text", url);
            yfiles.demo.Application.addFormRow(form, "linenumber", "Line number", "text", lineNumber + "");
          } else {
            var /*Object*/ err = /*(Object)*/error;
            var message = err["message"];
            var stack = err["stacktrace"] !== undefined ? err["stacktrace"] : err["stack"];
            var line = err["line"];
            var source = err["sourceURL"];
            if (message !== undefined) {
              yfiles.demo.Application.addFormRow(form, "error_message", "Error Message", "text", /*(string)*/message);
            }
            if (stack !== undefined) {
              (/*(HTMLTextAreaElement)*/yfiles.demo.Application.addFormRow(form, "stack", "Stack trace", "textarea", /*(string)*/stack)).rows = 3;
            }
            if (line !== undefined) {
              yfiles.demo.Application.addFormRow(form, "error_line", "Error Line", "text", /*(string)*/line);
            }
            if (source !== undefined) {
              yfiles.demo.Application.addFormRow(form, "error_source", "Error Source", "text", /*(string)*/source);
            }
          }

          (/*(HTMLTextAreaElement)*/yfiles.demo.Application.addFormRow(form, "comment", "Additional Comments", "textarea", "")).rows = 3;
          // if yFiles for HTML require.js was used to load modules, also add information about the loaded modules
          var /*Object*/ require = window["require"];
          if (!"undefined".equals(typeof(require)) && !"undefined".equals(typeof(require["getRequiredModuleStates"]))) {
            var /*string*/ moduleInfoText = "";
            var /*system.Func<yfiles.lang.ModuleInfo[]>*/ f = /*(system.Func<yfiles.lang.ModuleInfo[]>)*/((require)["getRequiredModuleStates"]);
            var /*yfiles.lang.ModuleInfo[]*/ arr;
            var /*int*/ i;
            for (i = 0, arr = f(); i < arr.length; i++) {
              var /*yfiles.lang.ModuleInfo*/ moduleInfo = arr[i];
              moduleInfoText += moduleInfo.name + ": " + moduleInfo.state + "\n";
            }
            if (moduleInfoText.length > 0) {
              moduleInfoText = moduleInfoText.substr(0, moduleInfoText.length - 1);
            }

            (/*(HTMLTextAreaElement)*/yfiles.demo.Application.addFormRow(form, "loaded_modules", "Loaded Modules", "textarea", moduleInfoText)).rows = 3;
          }

          var /*Element*/ submitButton = document.createElement("input");
          submitButton.setAttribute("type", "button");
          yfiles.demo.ElementExtensions.addClass(submitButton, "submit-button");
          submitButton.setAttribute("value", "Submit");
          submitButton.addEventListener("click", submitHandler, false);
          form.appendChild(submitButton);

          var /*Element*/ cancelButton = document.createElement("input");
          cancelButton.setAttribute("type", "reset");
          cancelButton.addEventListener("click", cancelHandler, false);
          yfiles.demo.ElementExtensions.addClass(cancelButton, "cancel-button");
          cancelButton.setAttribute("value", "Cancel");
          form.appendChild(cancelButton);
          document.body.appendChild(formDialog);

          window["yFilesAppStatus"] = error.toString();
          return true;// prevent default
        },
        
        /**
         * @return {Element}
         * @private
         */
        'addFormRow': function(/*Element*/ form, /*string*/ id, /*string*/ label, /*string*/ type, /*string*/ value) {
          var /*Element*/ labelElement = document.createElement("label");
          labelElement.setAttribute("for", "error_dialog_" + id);
          (/*(HTMLElement)*/labelElement).innerHTML = label;
          var /*Element*/ input = document.createElement("textarea".equals(type) ? "textarea" : "input");
          if (!"textarea".equals(type)) {
            input.setAttribute("type", type);
            input.setAttribute("value", value);
          } else {
            (/*(HTMLTextAreaElement)*/input).value = value;
          }
          input.setAttribute("id", "error_dialog_" + id);
          input.setAttribute("name", "error_dialog_" + id);
          form.appendChild(labelElement);
          form.appendChild(input);
          return input;
        },
        
        'addHiddenField': function(/*Element*/ form, /*string*/ id, /*string*/ value) {
          var /*Element*/ input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("value", value);
          input.setAttribute("id", "error_dialog_" + id);
          input.setAttribute("name", "error_dialog_" + id);
          form.appendChild(input);
        },
        
        'removeAllChildren': function(/*HTMLElement*/ element) {
          if (element.children !== undefined) {
            var /*int*/ n = element.children.length;
            for (var /*int*/ i = 0; i < n; i++) {
              var /*Element*/ child = /*(Element)*/element.children[0];
              element.removeChild(child);
            }
          }
        }
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ApplicationExtensions
   */
  /*public*/ exports.ApplicationExtensions = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ApplicationExtensions.prototype */
    return {
      
      /** @lends yfiles.demo.ApplicationExtensions */
      '$static': {
        'setProperty': function(/*yfiles.demo.Application*/ self, /*string*/ name, /*Object*/ value) {
          self[name] = value;
        },
        
        /** @return {Object} */
        'getProperty': function(/*yfiles.demo.Application*/ self, /*string*/ name) {
          var property = self[name];
          return property === undefined ? null : property;
        },
        
        'setTitle': function(/*yfiles.demo.Application*/ self, /*string*/ title) {
          document.title = title;
        }
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ActionCommand
   * @augments yfiles.system.ICommand
   */
  /*public*/ exports.ActionCommand = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ActionCommand.prototype */
    return {
      
      '$with': [yfiles.system.ICommand],
      
      'constructor': function(/*function()*/ action) {
        this.$action = action;
      },
      
      /**
       * @type function()
       * @private
       */
      '$action': null,
      
      /**
       * Backing field for below event.
       * @type function(Object, yfiles.system.EventArgs)
       * @private
       */
      '$canExecuteChangedEvent': null,
      
      'addCanExecuteChangedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$canExecuteChangedEvent = yfiles.lang.delegate.combine(this.$canExecuteChangedEvent, value);
      },
      
      'removeCanExecuteChangedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$canExecuteChangedEvent = yfiles.lang.delegate.remove(this.$canExecuteChangedEvent, value);
      },
      
      'execute': function(/*Object*/ parameter) {
        this.$action();
      },
      
      /** @return {boolean} */
      'canExecute': function(/*Object*/ parameter) {
        return true;
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ApplicationCommand
   * @augments yfiles.system.ICommand
   */
  /*public*/ exports.ApplicationCommand = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ApplicationCommand.prototype */
    return {
      
      '$with': [yfiles.system.ICommand],
      
      'constructor': function(/*yfiles.system.RoutedUICommand*/ uiCommand, /*yfiles.canvas.Control*/ target) {
        this.$uiCommand = uiCommand;
        this.$target = target;

        uiCommand.addCanExecuteChangedListener(yfiles.lang.delegate(this.$uiCommand_CanExecuteChanged, this));
      },
      
      /**
       * @type yfiles.system.RoutedUICommand
       * @private
       */
      '$uiCommand': null,
      
      /**
       * @type yfiles.canvas.Control
       * @private
       */
      '$target': null,
      
      /**
       * Backing field for below property 
       * @type Object
       * @private
       */
      '$parameter': null,
      
      /** @type Object */
      'parameter': {
        'get': function() {
          return this.$parameter;
        },
        'set': function(/*Object*/ value) {
          this.$parameter = value;
        }
      },
      
      'dispose': function() {
        this.$uiCommand.removeCanExecuteChangedListener(yfiles.lang.delegate(this.$uiCommand_CanExecuteChanged, this));
      },
      
      '$uiCommand_CanExecuteChanged': function(/*Object*/ sender, /*yfiles.system.EventArgs*/ e) {
        if (this.$canExecuteChangedEvent !== null) {
          this.$canExecuteChangedEvent(sender, e);
        }
      },
      
      /**
       * Backing field for below event.
       * @type function(Object, yfiles.system.EventArgs)
       * @private
       */
      '$canExecuteChangedEvent': null,
      
      'addCanExecuteChangedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$canExecuteChangedEvent = yfiles.lang.delegate.combine(this.$canExecuteChangedEvent, value);
      },
      
      'removeCanExecuteChangedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$canExecuteChangedEvent = yfiles.lang.delegate.remove(this.$canExecuteChangedEvent, value);
      },
      
      'execute': function(/*Object*/ ignored) {
        this.$uiCommand.executeOnTarget(this.parameter, this.$target);
      },
      
      /** @return {boolean} */
      'canExecute': function(/*Object*/ ignored) {
        return this.$uiCommand.canExecuteOnTarget(this.parameter, this.$target);
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * Walks through a given DOM Element and its children and modifies the DOM to represent a fully functional application.
   * @class yfiles.demo.ApplicationParser
   */
  /*public*/ exports.ApplicationParser = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ApplicationParser.prototype */
    return {
      
      /**
       * @type yfiles.demo.Application
       * @private
       */
      '$application': null,
      
      /** @type yfiles.demo.Application */
      'application': {
        'get': function() {
          return this.$application;
        },
        'set': function(/*yfiles.demo.Application*/ value) {
          this.$application = value;
        }
      },
      
      /**
       * @type yfiles.demo.IApplicationParserBackend
       * @private
       */
      '$backend': null,
      
      /** @type yfiles.demo.IApplicationParserBackend */
      'backend': {
        'get': function() {
          return this.$backend;
        },
        'set': function(/*yfiles.demo.IApplicationParserBackend*/ value) {
          this.$backend = value;
        }
      },
      
      /** @return {yfiles.demo.IApplicationFrame} */
      'parseApplication': function(/*Element*/ appRoot) {
        var /*yfiles.demo.ConversionResult*/ conversionResult = this.$convertElement(/*(HTMLElement)*/appRoot, null);
        var /*yfiles.demo.IComponent*/ component = conversionResult.component;
        if (yfiles.demo.IApplicationFrame.isInstance(component)) {
          var /*yfiles.demo.IApplicationFrame*/ applicationFrame = (/*(yfiles.demo.IApplicationFrame)*/component);
          applicationFrame.init();
          return applicationFrame;
        }
        return null;
      },
      
      /**
       * @return {yfiles.demo.ConversionResult}
       * @private
       */
      '$convertElement': function(/*HTMLElement*/ element, /*yfiles.demo.IContainer*/ parent) {
        var /*yfiles.demo.ConversionResult*/ conversionResult = this.$convert(element);

        if (conversionResult !== null) {
          if (parent !== null) {
            parent.add(conversionResult.component);
          }

          if (!conversionResult.traverseChildren) {
            return conversionResult;
          }
        }

        var /*HTMLElement*/ convertedElement = conversionResult !== null && conversionResult.hasReplacement ? conversionResult.replacement : element;

        var /*yfiles.demo.IContainer*/ nextParent = conversionResult !== null && yfiles.demo.IContainer.isInstance(conversionResult.component) ? /*(yfiles.demo.IContainer)*/conversionResult.component : parent;

        var /*HTMLElement[]*/ arr;
        var /*int*/ i;
        for (i = 0, arr = convertedElement.children; i < arr.length; i++) {
          var /*HTMLElement*/ child = arr[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            this.$convertElement(child, nextParent);
          }
        }
        return conversionResult;
      },
      
      /**
       * @return {yfiles.demo.ConversionResult}
       * @private
       */
      '$convert': function(/*HTMLElement*/ element) {
        var /*yfiles.demo.ConversionResult*/ result = null;
        var /*string*/ type = element.getAttribute("data-type");

        if (yfiles.system.StringExtensions.stringEquals("application", type)) {
          result = this.$backend.convertAppRoot(element, this.$application);
        } else if (yfiles.system.StringExtensions.stringEquals("button", element.tagName.toLowerCase())) {
          if (yfiles.system.StringExtensions.stringEquals("ToggleButton", type)) {
            result = this.$backend.convertToggleButton(element, this.$application);
          } else {
            result = this.$backend.convertButton(element, this.$application);
          }
        } else if (element.hasAttribute("data-type")) {
          if (yfiles.system.StringExtensions.stringEquals("GraphControl", type)) {
            var /*yfiles.canvas.GraphControl*/ control = new yfiles.canvas.GraphControl();
            var /*yfiles.demo.ConversionResult*/ newConversionResult;
            {
              newConversionResult = new yfiles.demo.ConversionResult(/*(yfiles.demo.IComponent)*/control);
              newConversionResult.replacement = control.div;
              newConversionResult.traverseChildren = false;
            }
            result = newConversionResult;
          } else if (yfiles.system.StringExtensions.stringEquals("GraphOverviewControl", type)) {
            var /*yfiles.canvas.GraphOverviewControl*/ control = new yfiles.canvas.GraphOverviewControl();
            var /*yfiles.demo.ConversionResult*/ newConversionResult1;
            {
              newConversionResult1 = new yfiles.demo.ConversionResult(/*(yfiles.demo.IComponent)*/control);
              newConversionResult1.replacement = control.div;
              newConversionResult1.traverseChildren = false;
            }
            result = newConversionResult1;
          } else if (yfiles.system.StringExtensions.stringEquals("CollapsiblePane", type)) {
            result = this.$backend.convertCollapsiblePane(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("ComboBox", type)) {
            result = this.$backend.convertComboBox(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("Panel", type)) {
            result = this.$backend.convertPanel(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("Separator", type)) {
            result = this.$backend.convertSeparator(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("ToolBar", type)) {
            result = this.$backend.convertToolBar(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("ToggleButton", type)) {
            result = this.$backend.convertToggleButton(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("TextArea", type)) {
            result = this.$backend.convertTextArea(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("BorderLayout", type)) {
            result = this.$backend.convertBorderLayout(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("Control", type)) {
            result = this.$backend.convertControl(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("CheckBox", type)) {
            result = this.$backend.convertCheckBox(element, this.$application);
          } else if (yfiles.system.StringExtensions.stringEquals("FramerateCounter", type)) {
            result = this.$backend.convertFramerateCounter(element, this.$application);
          }
        }

        if (result !== null && result.hasReplacement) {
          var /*HTMLElement*/ origElement = element;
          var /*HTMLElement*/ replacement = result.replacement;

          yfiles.demo.ApplicationParser.replaceElement(origElement, replacement);
        }

        if (element.hasAttribute("data-name")) {
          var dataObject = element;
          if (result !== null) {
            if (result.component !== null) {
              dataObject = result.component;
            } else if (result.hasReplacement) {
              dataObject = result.replacement;
            }
          }
          this.$application.setProperty(element.getAttribute("data-name"), dataObject);
        }

        return result;
      },
      
      'bindCommands': function(/*yfiles.demo.IComponent*/ component) {
        if (yfiles.demo.ICommandComponent.isInstance(component)) {
          this.$backend.bindCommand(/*(yfiles.demo.ICommandComponent)*/component, this.$application);
        }
        if (yfiles.demo.IContainer.isInstance(component)) {
          var /*yfiles.util.IEnumerator*/ tmpEnumerator;
          for (tmpEnumerator = (/*(yfiles.demo.IContainer)*/component).children.getEnumerator(); tmpEnumerator.moveNext(); ) {
            var /*yfiles.demo.IComponent*/ child = tmpEnumerator.current;
            {
              this.bindCommands(child);
            }
          }
        }
      },
      
      /** @lends yfiles.demo.ApplicationParser */
      '$static': {
        'replaceElement': function(/*HTMLElement*/ origElement, /*HTMLElement*/ replacement) {
          origElement.parentNode.replaceChild(replacement, origElement);

          var /*NamedNodeMap*/ attrs = origElement.attributes;
          if (attrs.length > 0) {
            var /*long*/ length = attrs.length;
            for (var /*int*/ i = 0; i < length; i++) {
              var /*Attr*/ attr = /*(Attr)*/attrs.item(i);
              if (attr.specified && !replacement.hasAttribute(attr.name)) {
                replacement.setAttribute(attr.name, attr.value);
              }
            }
          }

          //foreach (var child in origElement.children) {
          //  replacement.appendChild(child);
          //}
        }
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * Result of a conversion operation.
   * May contain a replacement DOM node and a Component that can be used to control the DOM node.
   * It also contains information on whether to process the children of the currently watched DOM node or not.
   * @class yfiles.demo.ConversionResult
   */
  /*public*/ exports.ConversionResult = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ConversionResult.prototype */
    return {
      
      'constructor': function(/*yfiles.demo.IComponent*/ component) {
        this.component = component;
        this.traverseChildren = true;
      },
      
      /**
       * Backing field for below property 
       * @type HTMLElement
       * @private
       */
      '$replacement': null,
      
      /** @type HTMLElement */
      'replacement': {
        'get': function() {
          return this.$replacement;
        },
        'set': function(/*HTMLElement*/ value) {
          this.$replacement = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type boolean
       * @private
       */
      '$traverseChildren': false,
      
      /** @type boolean */
      'traverseChildren': {
        'get': function() {
          return this.$traverseChildren;
        },
        'set': function(/*boolean*/ value) {
          this.$traverseChildren = value;
        }
      },
      
      /**
       * Backing field for below property 
       * @type yfiles.demo.IComponent
       * @private
       */
      '$component': null,
      
      /** @type yfiles.demo.IComponent */
      'component': {
        'get': function() {
          return this.$component;
        },
        'set': function(/*yfiles.demo.IComponent*/ value) {
          this.$component = value;
        }
      },
      
      /** @type boolean */
      'hasReplacement': {
        'get': function() {
          return this.replacement !== null;
        }
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * Converts (modifies or creates a replacement for) a DOM element so that it is suitable for usage as a component.
   * @class yfiles.demo.IApplicationParserBackend
   */
  /*public*/ exports.IApplicationParserBackend = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IApplicationParserBackend.prototype */
    return {
      /** @type yfiles.demo.IToolkit */
      'toolkit': {
        'get': yfiles.lang.Abstract
      },
      
      /**
       * The given action will be executed once the DOM has been build and all scripts and style sheets have been loaded.
       */
      'addOnLoadCallback': yfiles.lang.Abstract,
      
      /**
       * Converts the application root. Might be a div element or the document body.
       */
      'convertAppRoot': yfiles.lang.Abstract,
      
      /**
       * Binds registered commands to the elements with 'command-name' attribute. 
       * This is called after {@link yfiles.demo.IApplicationParserBackend#convertAppRoot} to ensure that all members already exist.
       */
      'bindCommand': yfiles.lang.Abstract,
      
      /**
       * Creates the default yFiles for HTML demo header.
       */
      'createHeader': yfiles.lang.Abstract,
      
      /**
       * Creates the default yFiles for HTML demo footer.
       */
      'createFooter': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertPanel': yfiles.lang.Abstract,
      
      /**
       * Creates a button from the given element.
       * If there is a "data-command" attribute, then it should try to find a matching {@link yfiles.system.ICommand} from
       * either the given {@link yfiles.demo.Application} or the {@link yfiles.system.CommandTypeConverter} and wrap it as the handler.
       */
      'convertButton': yfiles.lang.Abstract,
      
      /**
       * Creates a combo box from the given element.
       */
      'convertComboBox': yfiles.lang.Abstract,
      
      /**
       * Creates a collapsible pane for the given element.
       * The collapsible pane should contain a header and a content area.
       * The header content is contained in the "data-header" attribute, the content is the content of the element.
       * The collapse operation should be based on the value of the "data-collapse" property and should support the following values:
       * <ul>
       * <li>none - No action should be performed.</li>
       * <li>top - The content disappears, the header should not be changed.</li>
       * <li>left - The content disappears, the header is translated by -90 degrees.</li>
       * <li>right - The content disappears, the header is translated by 270 degrees.</li>
       * </ul>
       * If present, the {@link yfiles.demo.ConversionResult#component} should be an instance of {@link yfiles.demo.ICollapsiblePane}.
       */
      'convertCollapsiblePane': yfiles.lang.Abstract,
      
      /**
       * Creates a component that can be used as a separator. The input may be any type of element.
       */
      'convertSeparator': yfiles.lang.Abstract,
      
      /**
       * Converts an element into a toolbar which contains buttons.
       * @param {HTMLElement} element 
       * @param {yfiles.demo.Application} application 
       * @return {yfiles.demo.ConversionResult} 
       */
      'convertToolBar': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertToggleButton': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertTextArea': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertBorderLayout': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertControl': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertCheckBox': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertFramerateCounter': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * Responsible for creating or retrieving the {@link yfiles.demo.IApplicationParserBackend}.
   * To register a new backend, just add it to the {@link yfiles.demo.BackendFactory#BackendRegistry} field and pass the used key to
   * the {@link yfiles.demo.Application#start} in
   * the "options" parameter.
   * @class yfiles.demo.BackendFactory
   */
  /*public*/ exports.BackendFactory = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.BackendFactory.prototype */
    return {
      
      /** @lends yfiles.demo.BackendFactory */
      '$static': {
        /** @type Object */
        'BackendRegistry': null,
        
        /**
         * Backing field for below property 
         * @type yfiles.demo.IApplicationParserBackend
         * @private
         */
        '$currentBackend': null,
        
        /** @type yfiles.demo.IApplicationParserBackend */
        'currentBackend': {
          'get': function() {
            return yfiles.demo.BackendFactory.$currentBackend;
          },
          'set': function(/*yfiles.demo.IApplicationParserBackend*/ value) {
            yfiles.demo.BackendFactory.$currentBackend = value;
          }
        },
        
        /** @return {yfiles.demo.IApplicationParserBackend} */
        'getBackend': function(/*string*/ name) {
          if (yfiles.demo.BackendFactory.BackendRegistry[name] !== undefined) {
            return yfiles.demo.BackendFactory.currentBackend = /*(yfiles.demo.IApplicationParserBackend)*/yfiles.demo.BackendFactory.BackendRegistry[name];
          }
          return yfiles.demo.BackendFactory.currentBackend = new yfiles.demo.DefaultApplicationParserBackend();
        },
        
        '$clinit': function() {
          yfiles.demo.BackendFactory.BackendRegistry = new Object();
        }
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /*public*/ /*final*/ exports.ElementDimensions = new yfiles.StructDefinition(function() {
    return {
      'constructor': function(/*HTMLElement*/ element) {
        yfiles.demo.ElementDimensions.createDefault.call(this);
        var /*CSSStyleDeclaration*/ style = getComputedStyle(element);

        var /*double*/ pl = parseFloat(style.getPropertyValue("padding-left"));
        var /*double*/ pt = parseFloat(style.getPropertyValue("padding-top"));
        var /*double*/ pr = parseFloat(style.getPropertyValue("padding-right"));
        var /*double*/ pb = parseFloat(style.getPropertyValue("padding-bottom"));
        var /*double*/ ml = parseFloat(style.getPropertyValue("margin-left"));
        var /*double*/ mt = parseFloat(style.getPropertyValue("margin-top"));
        var /*double*/ mr = parseFloat(style.getPropertyValue("margin-right"));
        var /*double*/ mb = parseFloat(style.getPropertyValue("margin-bottom"));
        var /*double*/ w = parseFloat(style.getPropertyValue("width"));
        var /*double*/ h = parseFloat(style.getPropertyValue("height"));
        var /*double*/ bl = parseFloat(style.getPropertyValue("border-left-width"));
        var /*double*/ bt = parseFloat(style.getPropertyValue("border-top-width"));
        var /*double*/ br = parseFloat(style.getPropertyValue("border-right-width"));
        var /*double*/ bb = parseFloat(style.getPropertyValue("border-bottom-width"));

        var /*ClientRect*/ rect = element.getBoundingClientRect();

        this.$padding = new yfiles.geometry.InsetsD.FromLeftTopRightAndBottom(pl, pt, pr, pb);
        this.$margin = new yfiles.geometry.InsetsD.FromLeftTopRightAndBottom(ml, mt, mr, mb);
        this.$border = new yfiles.geometry.InsetsD.FromLeftTopRightAndBottom(bl, bt, br, bb);
        this.$size = new yfiles.geometry.SizeD(w, h);
        this.$location = new yfiles.geometry.PointD(rect.left, rect.top);
        this.$bounds = new yfiles.geometry.RectD(this.$location.x - this.$margin.left, this.$location.y - this.$margin.top, rect.width + this.$margin.left + this.$margin.right, rect.height + this.$margin.top + this.$margin.bottom);
        this.$contentRect = new yfiles.geometry.RectD(this.$padding.left, this.$padding.top, rect.width - this.$border.horizontalInsets - this.$padding.horizontalInsets, rect.height - this.$border.verticalInsets - this.$padding.verticalInsets);
      },
      
      /**
       * @type yfiles.geometry.InsetsD
       * @private
       */
      '$padding': null,
      
      /**
       * @type yfiles.geometry.InsetsD
       * @private
       */
      '$margin': null,
      
      /**
       * @type yfiles.geometry.InsetsD
       * @private
       */
      '$border': null,
      
      /**
       * @type yfiles.geometry.SizeD
       * @private
       */
      '$size': null,
      
      /**
       * @type yfiles.geometry.PointD
       * @private
       */
      '$location': null,
      
      /**
       * @type yfiles.geometry.RectD
       * @private
       */
      '$bounds': null,
      
      /**
       * @type yfiles.geometry.RectD
       * @private
       */
      '$contentRect': null,
      
      /** @type yfiles.geometry.RectD */
      'contentRect': {
        'get': function() {
          return this.$contentRect.clone();
        }
      },
      
      /** @type yfiles.geometry.InsetsD */
      'border': {
        'get': function() {
          return this.$border.clone();
        }
      },
      
      /** @type yfiles.geometry.InsetsD */
      'padding': {
        'get': function() {
          return this.$padding.clone();
        }
      },
      
      /** @type yfiles.geometry.InsetsD */
      'margin': {
        'get': function() {
          return this.$margin.clone();
        }
      },
      
      /** @type yfiles.geometry.SizeD */
      'size': {
        'get': function() {
          return this.$size.clone();
        }
      },
      
      /** @type yfiles.geometry.PointD */
      'location': {
        'get': function() {
          return this.$location.clone();
        }
      },
      
      /** @type yfiles.geometry.RectD */
      'bounds': {
        'get': function() {
          return this.$bounds.clone();
        }
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IComponent
   */
  /*public*/ exports.IComponent = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IComponent.prototype */
    return {
      /** @type Element */
      'element': {
        'get': yfiles.lang.Abstract
      },
      
      'setSize': yfiles.lang.Abstract,
      
      'setSizeWithUnit': yfiles.lang.Abstract,
      
      'setLocation': yfiles.lang.Abstract,
      
      'setBounds': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.ElementDimensions} */
      'getDimensions': yfiles.lang.Abstract,
      
      'setStyleProperty': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IContainer
   * @augments yfiles.demo.IComponent
   */
  /*public*/ exports.IContainer = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IContainer.prototype */
    return {
      '$with': [yfiles.demo.IComponent],
      
      /** @type yfiles.collections.IEnumerable */
      'children': {
        'get': yfiles.lang.Abstract
      },
      
      'add': yfiles.lang.Abstract,
      
      'remove': yfiles.lang.Abstract,
      
      'layoutChildren': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IPanel
   * @augments yfiles.demo.IContainer
   */
  /*public*/ exports.IPanel = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IPanel.prototype */
    return {
      '$with': [yfiles.demo.IContainer]
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IApplicationFrame
   * @augments yfiles.demo.IPanel
   */
  /*public*/ exports.IApplicationFrame = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IApplicationFrame.prototype */
    return {
      '$with': [yfiles.demo.IPanel],
      
      /** @type yfiles.demo.IComponent */
      'header': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type yfiles.demo.IComponent */
      'footer': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      'init': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ISeparator
   * @augments yfiles.demo.IComponent
   */
  /*public*/ exports.ISeparator = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.ISeparator.prototype */
    return {
      '$with': [yfiles.demo.IComponent]
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ICollapsiblePane
   * @augments yfiles.demo.IPanel
   */
  /*public*/ exports.ICollapsiblePane = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.ICollapsiblePane.prototype */
    return {
      '$with': [yfiles.demo.IPanel],
      
      'collapse': yfiles.lang.Abstract,
      
      'expand': yfiles.lang.Abstract,
      
      /** @type boolean */
      'isExpanded': {
        'get': yfiles.lang.Abstract
      },
      
      /** @type string */
      'header': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type Element */
      'content': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type yfiles.demo.CollapseStyle */
      'collapseStyle': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.CollapseStyle
   */
  /*public*/ exports.CollapseStyle = new yfiles.EnumDefinition(function() {
    /** @lends yfiles.demo.CollapseStyle */
    return {
      'TOP': 0,
      'LEFT': 1,
      'RIGHT': 2,
      'NONE': 3
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ICommandComponent
   * @augments yfiles.demo.IComponent
   */
  /*public*/ exports.ICommandComponent = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.ICommandComponent.prototype */
    return {
      '$with': [yfiles.demo.IComponent],
      
      /** @type yfiles.system.ICommand */
      'command': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type Object */
      'commandParameter': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type yfiles.canvas.Control */
      'commandTarget': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type boolean */
      'enabled': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      'addEventListener': yfiles.lang.Abstract,
      
      'removeEventListener': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IButton
   * @augments yfiles.demo.ICommandComponent
   */
  /*public*/ exports.IButton = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IButton.prototype */
    return {
      '$with': [yfiles.demo.ICommandComponent],
      
      /** @type string */
      'label': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type string */
      'icon': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IToggleButton
   * @augments yfiles.demo.IButton
   */
  /*public*/ exports.IToggleButton = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IToggleButton.prototype */
    return {
      '$with': [yfiles.demo.IButton],
      
      /** @type boolean */
      'isChecked': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IComboBox
   * @augments yfiles.demo.ICommandComponent
   */
  /*public*/ exports.IComboBox = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IComboBox.prototype */
    return {
      '$with': [yfiles.demo.ICommandComponent],
      
      /** @return {string} */
      'elementAt': yfiles.lang.Abstract,
      
      /** @type yfiles.collections.IEnumerable */
      'items': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type int */
      'length': {
        'get': yfiles.lang.Abstract
      },
      
      /** @type int */
      'selectedIndex': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type string */
      'selectedItem': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ITextArea
   * @augments yfiles.demo.IComponent
   */
  /*public*/ exports.ITextArea = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.ITextArea.prototype */
    return {
      '$with': [yfiles.demo.IComponent],
      
      /** @type string */
      'text': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IToolBar
   * @augments yfiles.demo.IContainer
   */
  /*public*/ exports.IToolBar = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IToolBar.prototype */
    return {
      '$with': [yfiles.demo.IContainer],
      
      /** @return {yfiles.demo.ISeparator} */
      'addSeparator': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.IButton} */
      'addButton': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IContextMenu
   * @augments yfiles.demo.IContainer
   */
  /*public*/ exports.IContextMenu = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IContextMenu.prototype */
    return {
      '$with': [yfiles.demo.IContainer],
      
      /** @type yfiles.geometry.PointD */
      'location': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @type boolean */
      'visible': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      },
      
      /** @return {yfiles.demo.ISeparator} */
      'addSeparator': yfiles.lang.Abstract,
      
      /** @return {yfiles.demo.IButton} */
      'createMenuItem': yfiles.lang.Abstract,
      
      'showAt': function(/*yfiles.geometry.PointD*/ location) {
        yfiles.demo.ComponentExtensions.showAt(this, location);
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ICheckBox
   * @augments yfiles.demo.IComponent
   */
  /*public*/ exports.ICheckBox = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.ICheckBox.prototype */
    return {
      '$with': [yfiles.demo.IComponent],
      
      /** @type boolean */
      'isChecked': {
        'get': yfiles.lang.Abstract,
        'set': yfiles.lang.Abstract
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.IToolkit
   */
  /*public*/ exports.IToolkit = new yfiles.InterfaceDefinition(function() {
    /** @lends yfiles.demo.IToolkit.prototype */
    return {
      /** @return {yfiles.demo.IContextMenu} */
      'createContextMenu': yfiles.lang.Abstract
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ContextMenu
   * @augments yfiles.demo.IContextMenu
   * @augments yfiles.input.IContextMenu
   */
  /*public*/ exports.ContextMenu = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ContextMenu.prototype */
    return {
      
      '$with': [yfiles.demo.IContextMenu, yfiles.input.IContextMenu],
      
      'constructor': function() {
        this.$closeOnClick = (function(/*Event*/ evt) {
          this.visible = false;
        }).bind(this);
        this.$peer = yfiles.demo.BackendFactory.currentBackend.toolkit.createContextMenu();
      },
      
      /**
       * @type yfiles.demo.IContextMenu
       * @private
       */
      '$peer': null,
      
      /** @type Element */
      'element': {
        'get': function() {
          return this.$peer.element;
        }
      },
      
      'setSize': function(/*yfiles.geometry.SizeD*/ newSize) {
        this.$peer.setSize(newSize);
      },
      
      'setSizeWithUnit': function(/*yfiles.geometry.SizeD*/ newSize, /*string*/ unit) {
        this.$peer.setSizeWithUnit(newSize, unit);
      },
      
      'setLocation': function(/*yfiles.geometry.PointD*/ location) {
        this.$peer.setLocation(location);
      },
      
      'setBounds': function(/*yfiles.geometry.RectD*/ bounds) {
        this.$peer.setBounds(bounds);
      },
      
      /** @return {yfiles.demo.ElementDimensions} */
      'getDimensions': function() {
        return this.$peer.getDimensions();
      },
      
      'setStyleProperty': function(/*string*/ propertyName, /*string*/ value) {
        this.$peer.setStyleProperty(propertyName, value);
      },
      
      /** @type yfiles.collections.IEnumerable */
      'children': {
        'get': function() {
          return this.$peer.children;
        }
      },
      
      'add': function(/*yfiles.demo.IComponent*/ child) {
        this.$peer.add(child);
      },
      
      'remove': function(/*yfiles.demo.IComponent*/ child) {
        this.$peer.remove(child);
      },
      
      'layoutChildren': function() {
        this.$peer.layoutChildren();
      },
      
      /** @type yfiles.geometry.PointD */
      'location': {
        'get': function() {
          return this.$peer.location;
        },
        'set': function(/*yfiles.geometry.PointD*/ value) {
          this.$peer.location = value.clone();
        }
      },
      
      /** @type boolean */
      'visible': {
        'get': function() {
          return this.$peer.visible;
        },
        'set': function(/*boolean*/ value) {
          this.$peer.visible = value;
          if (value) {
            this.$invokeOpened();
          } else {
            this.$invokeClosed();
          }
        }
      },
      
      /** @return {yfiles.demo.ISeparator} */
      'addSeparator': function() {
        return this.$peer.addSeparator();
      },
      
      /** @return {yfiles.demo.IButton} */
      'createMenuItem': function(/*string*/ label) {
        return this.$peer.createMenuItem(label);
      },
      
      'install': function(/*Element*/ element) {
        element.addEventListener("contextmenu", (function(/*Event*/ evt) {
          evt.preventDefault();
          var /*MouseEvent*/ mouseEvent = /*(MouseEvent)*/evt;
          this.showAt(new yfiles.geometry.PointD(mouseEvent.pageX, mouseEvent.pageY));
        }).bind(this), false);
      },
      
      /**
       * Backing field for below event.
       * @type function(Object, yfiles.system.EventArgs)
       * @private
       */
      '$openedEvent': null,
      
      'addOpenedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$openedEvent = yfiles.lang.delegate.combine(this.$openedEvent, value);
      },
      
      'removeOpenedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$openedEvent = yfiles.lang.delegate.remove(this.$openedEvent, value);
      },
      
      /**
       * Backing field for below event.
       * @type function(Object, yfiles.system.EventArgs)
       * @private
       */
      '$closedEvent': null,
      
      'addClosedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$closedEvent = yfiles.lang.delegate.combine(this.$closedEvent, value);
      },
      
      'removeClosedListener': function(/*function(Object, yfiles.system.EventArgs)*/ value) {
        this.$closedEvent = yfiles.lang.delegate.remove(this.$closedEvent, value);
      },
      
      /**
       * @type function(Event)
       * @private
       */
      '$closeOnClick': null,
      
      '$invokeClosed': function() {
        document.documentElement.removeEventListener("click", this.$closeOnClick, true);
        var /*system.EventHandler<yfiles.system.EventArgs>*/ handler = this.$closedEvent;
        if (handler !== null) {
          handler(this, yfiles.system.EventArgs.EMPTY);
        }
      },
      
      '$invokeOpened': function() {
        document.documentElement.addEventListener("click", this.$closeOnClick, true);
        var /*system.EventHandler<yfiles.system.EventArgs>*/ handler = this.$openedEvent;
        if (handler !== null) {
          handler(this, yfiles.system.EventArgs.EMPTY);
        }
      },
      
      /** @return {boolean} */
      'isEmpty': function() {
        return yfiles.collections.EnumerableExtensions./*<yfiles.demo.IComponent>*/count(this.$peer.children) === 0;
      },
      
      'clearItems': function() {
        var /*yfiles.demo.IComponent[]*/ arr;
        var /*int*/ i;
        for (i = 0, arr = yfiles.collections.EnumerableExtensions./*<yfiles.demo.IComponent>*/toArray(this.$peer.children); i < arr.length; i++) {
          var /*yfiles.demo.IComponent*/ child = arr[i];
          this.$peer.remove(child);
        }
      }
      
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ComponentExtensions
   */
  /*public*/ exports.ComponentExtensions = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ComponentExtensions.prototype */
    return {
      
      /** @lends yfiles.demo.ComponentExtensions */
      '$static': {
        'showAt': function(/*yfiles.demo.IContextMenu*/ menu, /*yfiles.geometry.PointD*/ location) {
          menu.location = location;
          menu.visible = true;
        }
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.DefaultApplicationParserBackend
   * @augments yfiles.demo.IApplicationParserBackend
   */
  /*public*/ exports.DefaultApplicationParserBackend = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.DefaultApplicationParserBackend.prototype */
    return {
      
      '$with': [yfiles.demo.IApplicationParserBackend],
      
      // #region IApplicationParserBackend members
      /** @type yfiles.demo.IToolkit */
      'toolkit': {
        'get': function() {
          return yfiles.demo.DefaultApplicationParserBackend.YToolkit.INSTANCE;
        }
      },
      
      'addOnLoadCallback': function(/*function()*/ callback) {
        document.addEventListener("DOMContentLoaded", function(/*Event*/ evt) {
          callback();
        }, false);
      },
      
      'bindCommand': function(/*yfiles.demo.ICommandComponent*/ commandComponent, /*yfiles.demo.Application*/ application) {
        var /*Element*/ element = commandComponent.element;
        if (element.hasAttribute("data-command")) {
          var /*string*/ commandName = element.getAttribute("data-command");
          var command = application.getProperty(commandName);
          if (command !== null) {
            if (yfiles.system.ICommand.isInstance(command)) {
              commandComponent.command = /*(yfiles.system.ICommand)*/command;
            } else {
              commandComponent.addEventListener(/*(EventListener)*/command);
            }
          } else {
            var /*yfiles.system.CommandTypeConverter*/ converter = new yfiles.system.CommandTypeConverter();
            command = converter.convertFrom(commandName);
            if (command !== null) {
              commandComponent.command = /*(yfiles.system.ICommand)*/command;
            } else {
              console.log("Unknown command: " + commandName);
            }
          }
        }

        if (element.hasAttribute("data-state")) {
          commandComponent.enabled = yfiles.system.StringExtensions.stringEquals("disabled", element.getAttribute("data-state"));
        }
      },
      
      /** @return {yfiles.demo.IComponent} */
      'createHeader': function() {
        var /*Element*/ header = document.createElement("header");
        header.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_REGION, yfiles.lang.Enum.getName(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.$class, yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP));
        header.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_SPLITTER, "false");
        header.setAttribute("data-type", "Panel");
        yfiles.demo.ElementExtensions.addClass(header, "header");

        var /*Element*/ leftDiv = document.createElement("div");
        yfiles.demo.ElementExtensions.addClass(leftDiv, "left");
        header.appendChild(leftDiv);

        leftDiv.appendChild(yfiles.demo.DefaultApplicationParserBackend.createImageLink("yFiles", "http://www.yworks.com/en/products_yfileshtml_about.html"));

        var /*Element*/ rightDiv = document.createElement("div");
        yfiles.demo.ElementExtensions.addClass(rightDiv, "right");
        header.appendChild(rightDiv);

        rightDiv.appendChild(yfiles.demo.DefaultApplicationParserBackend.createImageLink("yLogo", "http://www.yworks.com"));
        rightDiv.appendChild(yfiles.demo.DefaultApplicationParserBackend.createImageLink("ySlogan", "http://www.yworks.com"));
        return new yfiles.demo.DefaultApplicationParserBackend.YComponent(header);
      },
      
      /** @return {yfiles.demo.IComponent} */
      'createFooter': function() {
        var /*Element*/ footer = document.createElement("footer");
        (/*(HTMLElement)*/footer).innerHTML = "Copyright &copy; 2011-2013 yWorks GmbH &middot; All rights reserved";
        footer.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_REGION, yfiles.lang.Enum.getName(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.$class, yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.BOTTOM));
        footer.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_SPLITTER, "false");
        footer.setAttribute("data-type", "Panel");
        return new yfiles.demo.DefaultApplicationParserBackend.YComponent(footer);
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertAppRoot': function(/*Element*/ appRoot, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(appRoot, "y-app");

        var /*yfiles.demo.DefaultApplicationParserBackend.YApplicationFrame*/ applicationFrame = new yfiles.demo.DefaultApplicationParserBackend.YApplicationFrame(appRoot);

        this.$maybeAddHeaderAndFooter(appRoot, applicationFrame);

        var /*yfiles.demo.ConversionResult*/ result = new yfiles.demo.ConversionResult(applicationFrame);
        return result;
      },
      
      '$maybeAddHeaderAndFooter': function(/*Element*/ appRoot, /*yfiles.demo.DefaultApplicationParserBackend.YApplicationFrame*/ applicationFrame) {
        var /*boolean*/ shouldAddHeader = true;
        var /*boolean*/ shouldAddFooter = true;

        for (var /*int*/ i = 0; i < appRoot.childNodes.length; i++) {
          var /*Node*/ child = appRoot.childNodes.item(i);
          if (child.nodeType !== Node.ELEMENT_NODE) {
            continue;
          }
          var /*HTMLElement*/ element = /*(HTMLElement)*/child;
          switch (element.tagName) {
            case "header":
              shouldAddHeader = false;
              break;
            case "footer":
              shouldAddFooter = false;
              break;
          }
        }
        if (shouldAddHeader) {
          applicationFrame.header = this.createHeader();
        }
        if (shouldAddFooter) {
          applicationFrame.footer = this.createFooter();
        }
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertPanel': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-panel");
        return new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YPanel(element));
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertButton': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-button");
        var /*yfiles.demo.DefaultApplicationParserBackend.YButton*/ button = new yfiles.demo.DefaultApplicationParserBackend.YButton(element);
        yfiles.demo.DefaultApplicationParserBackend.initButton(element, button);
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(button);
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertCheckBox': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-checkbox");
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YCheckBox(element));
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertToggleButton': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-toggle-button");
        var /*yfiles.demo.DefaultApplicationParserBackend.YToggleButton*/ button = new yfiles.demo.DefaultApplicationParserBackend.YToggleButton(element);
        yfiles.demo.DefaultApplicationParserBackend.initButton(element, button);
        if (yfiles.system.StringExtensions.stringEquals("true", element.getAttribute("data-selected"))) {
          button.isChecked = true;
        }
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(button);
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertComboBox': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-combobox");
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YComboBox(element));
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertTextArea': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-textarea");
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YTextArea(element));
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertBorderLayout': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-borderlayout");
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout(element));
          newConversionResult.traverseChildren = true;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertControl': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        var /*string*/ controlType = element.getAttribute("data-control-type");
        var /*yfiles.canvas.Control*/ control = null;
        if (controlType !== null && controlType.length > 0) {
          var /*yfiles.lang.Class*/ type = yfiles.lang.Class.forName(controlType);
          if (type !== null) {
            var instance = type.newInstance();
            control = (instance instanceof yfiles.canvas.Control) ? /*(yfiles.canvas.Control)*/instance : null;
            if (control !== null) {
              control.initialize(/*(HTMLDivElement)*/element);
            }
          }
        }

        if (control === null) {
          throw new yfiles.lang.Exception("Could not create control instance (" + controlType + ")");
        }

        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(/*(yfiles.demo.IComponent)*/control);
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertCollapsiblePane': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-collapsible-pane");
        var /*Element*/ header = document.createElement("span");
        (/*(HTMLElement)*/header).innerHTML = element.getAttribute("data-header");
        header.setAttribute("class", "y-collapsible-pane-header");

        var /*Element*/ content = document.createElement("div");
        content.setAttribute("class", "y-collapsible-pane-content");

        if (element.children !== undefined) {
          var /*int*/ n = element.children.length;
          for (var /*int*/ i = 0; i < n; i++) {
            var /*Element*/ child = /*(Element)*/element.children[0];
            element.removeChild(child);
            content.appendChild(child);
          }
        }

        var /*yfiles.demo.CollapseStyle*/ collapseStyle;
        var /*string*/ style = element.hasAttribute("data-collapse") ? element.getAttribute("data-collapse").toLowerCase() : "none";
        switch (style) {
          case "left":
            collapseStyle = yfiles.demo.CollapseStyle.LEFT;
            break;
          case "right":
            collapseStyle = yfiles.demo.CollapseStyle.RIGHT;
            break;
          case "top":
            collapseStyle = yfiles.demo.CollapseStyle.TOP;
            break;
          default:
            collapseStyle = yfiles.demo.CollapseStyle.NONE;
            break;
        }

        var /*yfiles.demo.DefaultApplicationParserBackend.YCollapsiblePane*/ newYCollapsiblePane;
        {
          newYCollapsiblePane = new yfiles.demo.DefaultApplicationParserBackend.YCollapsiblePane(element);
          newYCollapsiblePane.header = element.getAttribute("data-header");
          newYCollapsiblePane.content = content;
          newYCollapsiblePane.collapseStyle = collapseStyle;
        }
        var /*yfiles.demo.DefaultApplicationParserBackend.YCollapsiblePane*/ collapsiblePane = newYCollapsiblePane;
        return new yfiles.demo.ConversionResult(collapsiblePane);
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertSeparator': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        if (!yfiles.system.StringExtensions.stringEquals(element.tagName.toLowerCase(), "span")) {
          element = /*(HTMLElement)*/document.createElement("span");
        }
        yfiles.demo.ElementExtensions.addClass(element, "y-separator");
        var /*yfiles.demo.ConversionResult*/ newConversionResult;
        {
          newConversionResult = new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YSeparator(element));
          newConversionResult.replacement = element;
          newConversionResult.traverseChildren = false;
        }
        return newConversionResult;
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertToolBar': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-toolbar");
        return new yfiles.demo.ConversionResult(new yfiles.demo.DefaultApplicationParserBackend.YToolBar(element));
      },
      
      /** @return {yfiles.demo.ConversionResult} */
      'convertFramerateCounter': function(/*HTMLElement*/ element, /*yfiles.demo.Application*/ application) {
        yfiles.demo.ElementExtensions.addClass(element, "y-fps-counter");
        var /*yfiles.demo.DefaultApplicationParserBackend.YFramerateCounter*/ counter = new yfiles.demo.DefaultApplicationParserBackend.YFramerateCounter(element);

        var /*string*/ smoothingAtt = element.getAttribute("smoothing");
        if (smoothingAtt !== null) {
          var /*int*/ smoothing = parseInt(smoothingAtt, 10);
          counter.smoothing = smoothing;
        }

        var /*string*/ updateInterval = element.getAttribute("updateInterval");
        if (updateInterval !== null) {
          var /*int*/ update = parseInt(updateInterval, 10);
          counter.updateInterval = update;
        }

        counter.start();
        return new yfiles.demo.ConversionResult(counter);
      },
      
      /** @lends yfiles.demo.DefaultApplicationParserBackend */
      '$static': {
        /**
         * @return {Element}
         * @private
         */
        'createImageLink': function(/*string*/ clazz, /*string*/ url) {
          var /*Element*/ yworksSlogan = document.createElement("a");
          yfiles.demo.ElementExtensions.addClass(yworksSlogan, clazz);
          yworksSlogan.setAttribute("href", url);
          return yworksSlogan;
        },
        
        'initButton': function(/*HTMLElement*/ element, /*yfiles.demo.IButton*/ button) {
          var /*string*/ inner = null;
          if (element.hasChildNodes()) {
            inner = element.innerHTML;
            element.innerHTML = "";
          }
          var /*HTMLElement*/ span = /*(HTMLElement)*/document.createElement("span");
          element.appendChild(span);
          if (inner !== null) {
            span.innerHTML = inner;
            yfiles.demo.ElementExtensions.addClass(span, "yTextContent");
          }
          var /*string*/ icon = element.getAttribute("data-icon");
          if (!"undefined".equals(typeof(icon)) && icon !== null) {
            yfiles.demo.ElementExtensions.addClass(span, "yIconSmall");
            button.icon = icon;
          }
        },
        
        // #endregion 
        // #region component implementations
        'SizeChangedEventArgs': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.system.EventArgs,
            
            'constructor': function(/*yfiles.geometry.SizeD*/ oldSize, /*yfiles.geometry.SizeD*/ newSize) {
              yfiles.system.EventArgs.call(this);
              this.$init();
              this.$oldSize = oldSize.clone();
              this.$newSize = newSize.clone();
            },
            
            /**
             * @type yfiles.geometry.SizeD
             * @private
             */
            '$oldSize': null,
            
            /**
             * @type yfiles.geometry.SizeD
             * @private
             */
            '$newSize': null,
            
            /** @type yfiles.geometry.SizeD */
            'oldSize': {
              'get': function() {
                return this.$oldSize.clone();
              }
            },
            
            /** @type yfiles.geometry.SizeD */
            'newSize': {
              'get': function() {
                return this.$newSize.clone();
              }
            },
            
            '$init': function() {
              this.$oldSize = yfiles.geometry.SizeD.createDefault();
              this.$newSize = yfiles.geometry.SizeD.createDefault();
            }
            
          };
        }),
        
        'YComponent': new yfiles.ClassDefinition(function() {
          return {
            
            '$with': [yfiles.demo.IComponent],
            
            'constructor': function(/*Element*/ element) {
              this.element1 = element;
            },
            
            /**
             * Backing field for below event.
             * @type function(Object, yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs)
             * @private
             */
            '$sizeChangedEvent': null,
            
            'addSizeChangedListener': function(/*function(Object, yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs)*/ value) {
              this.$sizeChangedEvent = yfiles.lang.delegate.combine(this.$sizeChangedEvent, value);
            },
            
            'removeSizeChangedListener': function(/*function(Object, yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs)*/ value) {
              this.$sizeChangedEvent = yfiles.lang.delegate.remove(this.$sizeChangedEvent, value);
            },
            
            /** @type Element */
            'element1': null,
            
            /** @type Element */
            'element': {
              'get': function() {
                return this.element1;
              }
            },
            
            'onSizeChanged': function(/*yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs*/ e) {
              if (this.$sizeChangedEvent !== null) {
                this.$sizeChangedEvent(this, e);
              }
            },
            
            'setSize': function(/*yfiles.geometry.SizeD*/ newSize) {
              this.setSizeWithUnit(newSize, null);
            },
            
            'setSizeWithUnit': function(/*yfiles.geometry.SizeD*/ newSize, /*string*/ unit) {
              var /*yfiles.demo.ElementDimensions*/ dim = this.getDimensions();

              var /*yfiles.geometry.SizeD*/ oldSize = dim.contentRect.size;

              var /*yfiles.geometry.InsetsD*/ padding = dim.padding;
              var /*yfiles.geometry.InsetsD*/ margin = dim.margin;
              var /*yfiles.geometry.InsetsD*/ border = dim.border;
              newSize.width = Math.max(0, newSize.width - padding.left - padding.right - margin.left - margin.right - border.left - border.right);
              newSize.height = Math.max(0, newSize.height - padding.top - padding.bottom - margin.top - margin.bottom - border.top - border.bottom);

              unit = (unit !== undefined && unit !== null) ? unit : "px";
              if (newSize.width > 0 && oldSize.width !== newSize.width) {
                this.setStyleProperty("width", newSize.width + unit);
              }
              if (newSize.height > 0 && oldSize.height !== newSize.height) {
                this.setStyleProperty("height", newSize.height + unit);
              }
              this.onSizeChanged(new yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs(oldSize, newSize));
            },
            
            'setLocation': function(/*yfiles.geometry.PointD*/ location) {
              this.setStyleProperty("left", location.x + "px");
              this.setStyleProperty("top", location.y + "px");
            },
            
            'setBounds': function(/*yfiles.geometry.RectD*/ bounds) {
              this.setLocation(bounds.topLeft);
              this.setSize(bounds.size);
            },
            
            /** @return {yfiles.demo.ElementDimensions} */
            'getDimensions': function() {
              return new yfiles.demo.ElementDimensions(/*(HTMLElement)*/this.element);
            },
            
            'setStyleProperty': function(/*string*/ propertyName, /*string*/ value) {
              var /*CSSStyleDeclaration*/ style = (/*(HTMLElement)*/this.element1).style;
              style.setProperty(propertyName, value, null);
            }
            
          };
        }),
        
        'YContainer': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
            
            '$with': [yfiles.demo.IContainer],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
              this.$children = new yfiles.collections.List/*<yfiles.demo.IComponent>*/();
            },
            
            /**
             * @type yfiles.collections.List
             * @private
             */
            '$children': null,
            
            /** @type yfiles.collections.IEnumerable */
            'children': {
              'get': function() {
                return this.$children;
              }
            },
            
            'add': function(/*yfiles.demo.IComponent*/ child) {
              this.$children.add(child);
            },
            
            'remove': function(/*yfiles.demo.IComponent*/ child) {
              this.$children.remove(child);
              this.removeWithElement(child instanceof yfiles.canvas.Control ? (/*(yfiles.canvas.Control)*/child).div : child.element);
            },
            
            'layoutChildren': function() {
              var /*yfiles.util.IEnumerator*/ tmpEnumerator;
              for (tmpEnumerator = this.children.getEnumerator(); tmpEnumerator.moveNext(); ) {
                var /*yfiles.demo.IComponent*/ child = tmpEnumerator.current;
                {
                  if (yfiles.demo.IContainer.isInstance(child)) {
                    (/*(yfiles.demo.IContainer)*/child).layoutChildren();
                  }
                }
              }
            },
            
            'addWithElement': function(/*Element*/ e) {
              if (e.parentNode !== this.element) {
                this.element.appendChild(e);
              }
            },
            
            'removeWithElement': function(/*Element*/ e) {
              if (e.parentNode === this.element) {
                this.element.removeChild(e);
              }
            },
            
            'onSizeChanged': function(/*yfiles.demo.DefaultApplicationParserBackend.SizeChangedEventArgs*/ e) {
              this.layoutChildren();
            }
            
          };
        }),
        
        'YPanel': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YContainer,
            
            '$with': [yfiles.demo.IPanel],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YContainer.call(this, element);
            }
            
          };
        }),
        
        'YApplicationFrame': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YContainer,
            
            '$with': [yfiles.demo.IApplicationFrame],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YContainer.call(this, element);
              var /*HTMLElement*/ borderLayoutDiv = /*(HTMLElement)*/document.createElement("div");
              borderLayoutDiv.setAttribute("id", "y-app-borderlayout");
              borderLayoutDiv.setAttribute("data-type", "BorderLayout");
              this.$borderLayout = new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout(borderLayoutDiv);
              this.$borderLayout.setStyleProperty("width", "100%");
              this.$borderLayout.setStyleProperty("height", "100%");

              var /*HTMLElement*/ centerDiv = /*(HTMLElement)*/document.createElement("div");
              centerDiv.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_REGION, yfiles.lang.Enum.getName(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.$class, yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER));
              centerDiv.setAttribute("id", "y-app-borderlayout-center");
              centerDiv.setAttribute("data-type", "Panel");
              this.$centerPanel = new yfiles.demo.DefaultApplicationParserBackend.YPanel(centerDiv);
              this.$borderLayout.add(this.$centerPanel);
              this.$borderLayout.element.appendChild(this.$centerPanel.element);

              var /*HTMLElement[]*/ arr;
              var /*int*/ i;
              for (i = 0, arr = (/*(HTMLElement)*/element).children; i < arr.length; i++) {
                var /*HTMLElement*/ child = arr[i];
                centerDiv.appendChild(child);
              }

              this.element.appendChild(this.$borderLayout.element);
            },
            
            /**
             * @type yfiles.demo.IComponent
             * @private
             */
            '$header': null,
            
            /**
             * @type yfiles.demo.IComponent
             * @private
             */
            '$footer': null,
            
            /**
             * @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout
             * @private
             */
            '$borderLayout': null,
            
            /**
             * @type yfiles.demo.DefaultApplicationParserBackend.YPanel
             * @private
             */
            '$centerPanel': null,
            
            /** @type yfiles.demo.IComponent */
            'header': {
              'get': function() {
                return this.$header;
              },
              'set': function(/*yfiles.demo.IComponent*/ value) {
                var /*Element*/ headerParent = this.$borderLayout.element;
                if (value.element.parentNode !== headerParent) {
                  if (this.$header !== null) {
                    this.remove(this.$header);
                    headerParent.replaceChild(value.element, this.$header.element);
                  } else if (headerParent.childNodes.length > 0) {
                    headerParent.insertBefore(value.element, headerParent.firstChild);
                  } else {
                    headerParent.appendChild(value.element);
                  }
                }
                this.$header = value;
                this.$borderLayout.add(this.$header);
              }
            },
            
            /** @type yfiles.demo.IComponent */
            'footer': {
              'get': function() {
                return this.$footer;
              },
              'set': function(/*yfiles.demo.IComponent*/ value) {
                var /*Element*/ footerParent = this.$borderLayout.element;
                if (value.element.parentNode !== footerParent) {
                  if (this.$footer !== null) {
                    this.remove(this.$footer);
                    footerParent.replaceChild(value.element, this.$footer.element);
                  } else {
                    footerParent.appendChild(value.element);
                  }
                }
                this.$footer = value;
                this.$borderLayout.add(this.$footer);
              }
            },
            
            'removeWithElement': function(/*Element*/ e) {
              if (e.parentNode === this.$centerPanel.element) {
                this.$centerPanel.element.removeChild(e);
              }
            },
            
            'init': function() {
              this.layoutChildren();
              window.addEventListener("resize", (function(/*Event*/ evt) {
                this.layoutChildren();
              }).bind(this), false);
            }
            
          };
        }),
        
        'YToolBar': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YContainer,
            
            '$with': [yfiles.demo.IToolBar],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YContainer.call(this, element);
            },
            
            /** @return {yfiles.demo.ISeparator} */
            'addSeparator': function() {
              var /*yfiles.demo.DefaultApplicationParserBackend.YSeparator*/ separator = yfiles.demo.DefaultApplicationParserBackend.YToolkit.INSTANCE.$createSeparator();
              this.add(separator);
              return separator;
            },
            
            /** @return {yfiles.demo.IButton} */
            'addButton': function(/*string*/ label) {
              var /*yfiles.demo.DefaultApplicationParserBackend.YButton*/ button = yfiles.demo.DefaultApplicationParserBackend.YToolkit.INSTANCE.$createButton(label);
              this.add(button);
              return button;
            }
            
          };
        }),
        
        'YSeparator': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
            
            '$with': [yfiles.demo.ISeparator],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
            }
            
          };
        }),
        
        'YCommandComponent': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
            '$abstract': true,
            
            '$with': [yfiles.demo.ICommandComponent],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
            },
            
            /**
             * @type yfiles.system.ICommand
             * @private
             */
            '$command': null,
            
            /** @type yfiles.system.ICommand */
            'command': {
              'get': function() {
                return this.$command;
              },
              'set': function(/*yfiles.system.ICommand*/ value) {
                if (this.$command !== value) {
                  if (this.$command !== null) {
                    this.$command.removeCanExecuteChangedListener(yfiles.lang.delegate(this.$handleCommandCanExecuteChanged, this));
                  }
                  this.$command = value;
                  if (this.$command !== null) {
                    this.$command.addCanExecuteChangedListener(yfiles.lang.delegate(this.$handleCommandCanExecuteChanged, this));
                    this.$handleCommandCanExecuteChanged(null, null);
                  } else {
                    this.enabled = false;
                  }
                }
              }
            },
            
            /**
             * @type Object
             * @private
             */
            '$commandParameter': null,
            
            /** @type Object */
            'commandParameter': {
              'get': function() {
                return this.$commandParameter;
              },
              'set': function(/*Object*/ value) {
                if (this.$commandParameter !== value) {
                  this.$commandParameter = value;
                  if (this.$command !== null) {
                    this.$handleCommandCanExecuteChanged(null, null);
                  }
                }
              }
            },
            
            /**
             * @type yfiles.canvas.Control
             * @private
             */
            '$commandTarget': null,
            
            /** @type yfiles.canvas.Control */
            'commandTarget': {
              'get': function() {
                return this.$commandTarget;
              },
              'set': function(/*yfiles.canvas.Control*/ value) {
                if (this.$commandTarget !== value) {
                  this.$commandTarget = value;
                  if (this.$command !== null) {
                    this.$handleCommandCanExecuteChanged(null, null);
                  }
                }
              }
            },
            
            '$handleCommandCanExecuteChanged': function(/*Object*/ sender, /*yfiles.system.EventArgs*/ e) {
              if (this.$command !== null) {
                var /*boolean*/ canExecute = this.$command instanceof yfiles.system.RoutedCommand ? (/*(yfiles.system.RoutedCommand)*/this.$command).canExecuteOnTarget(this.$commandParameter, this.$commandTarget) : this.$command.canExecute(this.$commandParameter);
                this.enabled = canExecute;
              } else {
                this.enabled = false;
              }
            },
            
            '$maybeExecuteCommand': function(/*Event*/ e) {
              if (this.$command !== null && this.$enabled) {
                var /*boolean*/ canExecute = this.$command instanceof yfiles.system.RoutedCommand ? (/*(yfiles.system.RoutedCommand)*/this.$command).canExecuteOnTarget(this.$commandParameter, this.$commandTarget) : this.$command.canExecute(this.$commandParameter);
                if (canExecute) {
                  if (this.$command instanceof yfiles.system.RoutedCommand) {
                    (/*(yfiles.system.RoutedCommand)*/this.$command).executeOnTarget(this.$commandParameter, this.$commandTarget);
                  } else {
                    this.$command.execute(this.$commandParameter);
                  }
                }
              }
            },
            
            /**
             * @type boolean
             * @private
             */
            '$enabled': false,
            
            /** @type boolean */
            'enabled': {
              'get': function() {
                return this.$enabled;
              },
              'set': function(/*boolean*/ value) {
                if (value !== this.$enabled) {
                  if (value) {
                    yfiles.demo.ElementExtensions.removeClass(this.element1, "y-disabled");
                  } else {
                    yfiles.demo.ElementExtensions.addClass(this.element1, "y-disabled");
                  }
                  this.$enabled = value;
                }
              }
            },
            
            'addEventListener': yfiles.lang.Abstract,
            
            'removeEventListener': yfiles.lang.Abstract
            
          };
        }),
        
        'YButton': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YCommandComponent,
            
            '$with': [yfiles.demo.IButton],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YCommandComponent.call(this, element);
              this.enabled = true;
              this.addEventListener(yfiles.lang.delegate(this.$maybeExecuteCommand, this));
            },
            
            /** @type string */
            'label': {
              'get': function() {
                return (/*(HTMLElement)*/this.element1.firstChild).innerHTML;
              },
              'set': function(/*string*/ value) {
                (/*(HTMLElement)*/this.element1.firstChild).innerHTML = value;
              }
            },
            
            /**
             * @type string
             * @private
             */
            '$iconClass': null,
            
            /** @type string */
            'icon': {
              'get': function() {
                return this.$iconClass;
              },
              'set': function(/*string*/ value) {
                if (yfiles.system.StringExtensions.isNotEqual(this.$iconClass, value)) {
                  var /*HTMLElement*/ span = (/*(HTMLElement)*/this.element1.firstChild);
                  if (this.$iconClass !== null) {
                    yfiles.demo.ElementExtensions.removeClass(span, this.$iconClass);
                  }
                  if (value !== null) {
                    yfiles.demo.ElementExtensions.addClass(span, value);
                  }
                  this.$iconClass = value;
                }
              }
            },
            
            'addEventListener': function(/*function(Event)*/ handler) {
              this.element1.addEventListener("click", handler, false);
            },
            
            'removeEventListener': function(/*function(Event)*/ handler) {
              this.element1.removeEventListener("click", handler, false);
            }
            
          };
        }),
        
        'YToggleButton': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YButton,
            
            '$with': [yfiles.demo.IToggleButton],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YButton.call(this, element);
              this.removeEventListener(yfiles.lang.delegate(this.$maybeExecuteCommand, this));
              element.addEventListener("click", yfiles.lang.delegate(this.$toggleState, this), false);
            },
            
            '$toggleState': function(/*Event*/ evt) {
              this.isChecked = !this.isChecked;
            },
            
            /**
             * @type boolean
             * @private
             */
            '$isChecked': false,
            
            /** @type boolean */
            'isChecked': {
              'get': function() {
                return this.$isChecked;
              },
              'set': function(/*boolean*/ value) {
                if (this.$isChecked !== value) {
                  this.$isChecked = value;
                  if (this.$isChecked) {
                    yfiles.demo.ElementExtensions.addClass(this.element1, "isChecked");
                  } else {
                    yfiles.demo.ElementExtensions.removeClass(this.element1, "isChecked");
                  }
                  this.$maybeExecuteCommand(null);
                }
              }
            }
            
          };
        }),
        
        'YContextMenu': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YContainer,
            
            '$with': [yfiles.demo.IContextMenu],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YContainer.call(this, element);
              this.$init2();
              this.location = new yfiles.geometry.PointD(0, 0);
              this.visible = false;
            },
            
            /**
             * @type yfiles.geometry.PointD
             * @private
             */
            '$location': null,
            
            /** @type yfiles.geometry.PointD */
            'location': {
              'get': function() {
                return this.$location.clone();
              },
              'set': function(/*yfiles.geometry.PointD*/ value) {
                this.$location = value.clone();
                var /*CSSStyleDeclaration*/ style = (/*(HTMLElement)*/this.element).style;
                style.setProperty("left", value.x + "px", "");
                style.setProperty("top", value.y + "px", "");
              }
            },
            
            /**
             * @type boolean
             * @private
             */
            '$visible': false,
            
            /** @type boolean */
            'visible': {
              'get': function() {
                return this.$visible;
              },
              'set': function(/*boolean*/ value) {
                if (this.$visible !== value) {
                  this.$visible = value;
                  var /*CSSStyleDeclaration*/ style = (/*(HTMLElement)*/this.element).style;
                  if (this.$visible) {
                    style.setProperty("display", "block", "");
                  } else {
                    style.setProperty("display", "none", "");
                  }
                }
              }
            },
            
            /** @return {yfiles.demo.ISeparator} */
            'addSeparator': function() {
              var /*yfiles.demo.DefaultApplicationParserBackend.YSeparator*/ separator = yfiles.demo.DefaultApplicationParserBackend.YToolkit.INSTANCE.$createSeparator();
              this.add(separator);
              this.addWithElement(separator.element);
              return separator;
            },
            
            /** @return {yfiles.demo.IButton} */
            'createMenuItem': function(/*string*/ label) {
              var /*yfiles.demo.IButton*/ menuItem = yfiles.demo.DefaultApplicationParserBackend.YToolkit.INSTANCE.$createMenuItem(label);
              this.add(menuItem);
              this.addWithElement(menuItem.element);
              return menuItem;
            },
            
            '$init2': function() {
              this.$location = yfiles.geometry.PointD.createDefault();
            }
            
          };
        }),
        
        'YTextArea': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
            
            '$with': [yfiles.demo.ITextArea],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
              this.textAreaElement = /*(HTMLTextAreaElement)*/element;
            },
            
            /**
             * Backing field for below property 
             * @type HTMLTextAreaElement
             * @private
             */
            '$textAreaElement': null,
            
            /**
             * @type HTMLTextAreaElement
             * @private
             */
            'textAreaElement': {
              'get': function() {
                return this.$textAreaElement;
              },
              'set': function(/*HTMLTextAreaElement*/ value) {
                this.$textAreaElement = value;
              }
            },
            
            /** @type string */
            'text': {
              'get': function() {
                return this.textAreaElement.value;
              },
              'set': function(/*string*/ value) {
                this.textAreaElement.value = value;
              }
            }
            
          };
        }),
        
        'YBorderLayout': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YContainer,
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YContainer.call(this, element);
              var /*string*/ idAtt = element.getAttribute("id");
              if (idAtt === null || idAtt.length === 0) {
                element.setAttribute("id", "y-border-layout-" + yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.count);
              }
              yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.count++;
            },
            
            'layoutChildren': function() {
              this.setStyleProperty("position", "relative");

              var /*yfiles.geometry.RectD*/ box = this.getDimensions().contentRect;

              var /*yfiles.collections.List<yfiles.demo.IComponent>*/ sorted = yfiles.collections.EnumerableExtensions./*<yfiles.demo.IComponent>*/toList(this.children);
              sorted.sort(new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer(this));

              var /*yfiles.collections.List<yfiles.demo.IComponent>*/ childrenAndSplitters = new yfiles.collections.List/*<yfiles.demo.IComponent>*/();

              var /*yfiles.util.IEnumerator*/ tmpEnumerator;
              for (tmpEnumerator = sorted.getListEnumerator(); tmpEnumerator.moveNext(); ) {
                var /*yfiles.demo.IComponent*/ child = tmpEnumerator.current;
                {
                  childrenAndSplitters.add(child);
                  if (child instanceof yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent) {
                    var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YSplitter*/ splitter = (/*(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent)*/child).splitter;
                    if (null !== splitter) {
                      childrenAndSplitters.add(splitter);
                    }
                  }
                }
              }

              var /*yfiles.util.IEnumerator*/ tmpEnumerator1;
              for (tmpEnumerator1 = childrenAndSplitters.getListEnumerator(); tmpEnumerator1.moveNext(); ) {
                var /*yfiles.demo.IComponent*/ child = tmpEnumerator1.current;
                {
                  var /*yfiles.demo.ElementDimensions*/ childDimensions = child.getDimensions();
                  var /*yfiles.geometry.RectD*/ childBounds = childDimensions.bounds;
                  var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ region = yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutRegion(child);

                  if (child instanceof yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent) {
                    var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent*/ resizableChild = (/*(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent)*/child);
                    if (resizableChild.changeSize) {
                      var /*yfiles.geometry.SizeD*/ newSize = resizableChild.newSize;
                      childBounds.width = newSize.width;
                      childBounds.height = newSize.height;
                      resizableChild.changeSize = false;
                    }
                  }

                  child.setLocation(box.topLeft);
                  child.setStyleProperty("position", "absolute");

                  switch (region) {
                    case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP:
                    case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.BOTTOM:
                      child.setSize(new yfiles.geometry.SizeD(box.width, childBounds.height));
                      box.height = box.height - (childBounds.height);
                      if (region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP) {
                        box.y = box.y + (childBounds.height);
                      } else {
                        child.setStyleProperty("top", box.y + box.height + "px");
                      }
                      break;
                    case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT:
                    case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.RIGHT:
                      child.setSize(new yfiles.geometry.SizeD(childBounds.width, box.height));
                      box.width = box.width - (childBounds.width);
                      if (region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT) {
                        box.x = box.x + (childBounds.width);
                      } else {
                        child.setStyleProperty("left", box.x + box.width + "px");
                      }
                      break;
                    case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER:
                      child.setBounds(box.clone());
                      break;
                  }
                }
              }


            },
            
            'add': function(/*yfiles.demo.IComponent*/ child) {
              var /*Element*/ childElement = child.element;
              var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion = yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutRegion(child);
              if (layoutRegion !== yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER) {
                var /*string*/ splitterAtt = childElement.getAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_SPLITTER);
                var /*boolean*/ resizable = splitterAtt !== null ? !yfiles.system.StringExtensions.stringEquals(yfiles.system.StringExtensions.toLowerInvariant(splitterAtt), "false") : true;
                if (resizable) {
                  var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent*/ resizableChild = yfiles.demo.IContainer.isInstance(child) ? new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableContainer(this, /*(yfiles.demo.IContainer)*/child, layoutRegion) : new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent(this, child, layoutRegion);
                  yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.$super.add.call(this, resizableChild);
                } else {
                  yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.$super.add.call(this, child);
                }
              } else {
                yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.$super.add.call(this, child);
              }

              var /*string*/ idAtt = child.element.getAttribute("id");
              if (idAtt === null || idAtt.length === 0) {
                var /*string*/ parentId = this.element.getAttribute("id");
                this.element1.setAttribute("id", parentId + "-child-" + yfiles.collections.EnumerableExtensions./*<yfiles.demo.IComponent>*/count(this.children));
              }
            },
            
            /** @lends yfiles.demo.DefaultApplicationParserBackend */
            '$static': {
              /**
               * @type int
               * @private
               */
              'count': 0,
              
              'LayoutRegion': new yfiles.EnumDefinition(function() {
                return {
                  'TOP': 0,
                  'LEFT': 1,
                  'BOTTOM': 2,
                  'RIGHT': 3,
                  'CENTER': 4,
                  'UNKNOWN': 5
                };
              }),
              
              'LayoutArrangement': new yfiles.EnumDefinition(function() {
                return {
                  'HEADLINE': 0,
                  'SIDEBAR': 1
                };
              }),
              
              /** @type string */
              'DATA_ATTRIBUTE_LAYOUT_REGION': "data-layout-region",
              
              /** @type string */
              'DATA_ATTRIBUTE_SPLITTER': "data-splitter",
              
              /** @type string */
              'DATA_ATTRIBUTE_LAYOUT_ARRANGEMENT': "data-layout-arrangement",
              
              'YResizableContainer': new yfiles.ClassDefinition(function() {
                return {
                  '$extends': yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent,
                  
                  '$with': [yfiles.demo.IContainer],
                  
                  'constructor': function(/*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout*/ parent, /*yfiles.demo.IContainer*/ component, /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion) {
                    yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent.call(this, parent, component, layoutRegion);
                  },
                  
                  /** @type yfiles.collections.IEnumerable */
                  'children': {
                    'get': function() {
                      return (/*(yfiles.demo.IContainer)*/this.component).children;
                    }
                  },
                  
                  'add': function(/*yfiles.demo.IComponent*/ child) {
                    (/*(yfiles.demo.IContainer)*/this.component).add(child);
                  },
                  
                  'remove': function(/*yfiles.demo.IComponent*/ child) {
                    (/*(yfiles.demo.IContainer)*/this.component).remove(child);
                  },
                  
                  'layoutChildren': function() {
                    (/*(yfiles.demo.IContainer)*/this.component).layoutChildren();
                  }
                  
                };
              }),
              
              'YResizableComponent': new yfiles.ClassDefinition(function() {
                return {
                  
                  '$with': [yfiles.demo.IComponent],
                  
                  'constructor': function(/*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout*/ parent, /*yfiles.demo.IComponent*/ component, /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion) {
                    this.$init1();
                    this.$component = component;

                    var /*HTMLElement*/ splitterContainer = /*(HTMLElement)*/document.createElement("div");
                    yfiles.demo.ElementExtensions.addClass(splitterContainer, "y-splitter");
                    if (layoutRegion === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT || layoutRegion === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.RIGHT) {
                      yfiles.demo.ElementExtensions.addClass(splitterContainer, "y-splitter-vertical");
                    } else {
                      yfiles.demo.ElementExtensions.addClass(splitterContainer, "y-splitter-horizontal");
                    }
                    splitterContainer.setAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_REGION, yfiles.lang.Enum.getName(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.$class, layoutRegion));

                    var /*HTMLElement*/ splitterThumb = /*(HTMLElement)*/document.createElement("div");
                    yfiles.demo.ElementExtensions.addClass(splitterThumb, "y-splitter-thumb");
                    splitterContainer.appendChild(splitterThumb);

                    var /*Node*/ sibling = this.element.nextSibling;
                    if (sibling === null) {
                      parent.element.appendChild(splitterContainer);
                    } else {
                      parent.element.insertBefore(splitterContainer, sibling);
                    }

                    this.$splitter = new yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YSplitter(splitterContainer, this, parent, layoutRegion);
                  },
                  
                  /**
                   * @type yfiles.demo.IComponent
                   * @private
                   */
                  '$component': null,
                  
                  /**
                   * @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YSplitter
                   * @private
                   */
                  '$splitter': null,
                  
                  /**
                   * Backing field for below property 
                   * @type yfiles.geometry.SizeD
                   * @private
                   */
                  '$newSize': null,
                  
                  /** @type yfiles.geometry.SizeD */
                  'newSize': {
                    'get': function() {
                      return this.$newSize;
                    },
                    'set': function(/*yfiles.geometry.SizeD*/ value) {
                      this.$newSize = value;
                    }
                  },
                  
                  /**
                   * Backing field for below property 
                   * @type boolean
                   * @private
                   */
                  '$changeSize': false,
                  
                  /** @type boolean */
                  'changeSize': {
                    'get': function() {
                      return this.$changeSize;
                    },
                    'set': function(/*boolean*/ value) {
                      this.$changeSize = value;
                    }
                  },
                  
                  /** @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YSplitter */
                  'splitter': {
                    'get': function() {
                      return this.$splitter;
                    }
                  },
                  
                  /** @type yfiles.demo.IComponent */
                  'component': {
                    'get': function() {
                      return this.$component;
                    }
                  },
                  
                  /** @type Element */
                  'element': {
                    'get': function() {
                      return this.$component.element;
                    }
                  },
                  
                  'setSize': function(/*yfiles.geometry.SizeD*/ newSize) {
                    this.$component.setSize(newSize);
                  },
                  
                  'setSizeWithUnit': function(/*yfiles.geometry.SizeD*/ newSize, /*string*/ unit) {
                    this.$component.setSizeWithUnit(newSize, unit);
                  },
                  
                  'setLocation': function(/*yfiles.geometry.PointD*/ location) {
                    this.$component.setLocation(location);
                  },
                  
                  'setBounds': function(/*yfiles.geometry.RectD*/ bounds) {
                    this.$component.setBounds(bounds);
                  },
                  
                  /** @return {yfiles.demo.ElementDimensions} */
                  'getDimensions': function() {
                    return this.$component.getDimensions();
                  },
                  
                  'setStyleProperty': function(/*string*/ propertyName, /*string*/ value) {
                    this.$component.setStyleProperty(propertyName, value);
                  },
                  
                  '$init1': function() {
                    this.$newSize = yfiles.geometry.SizeD.createDefault();
                  }
                  
                };
              }),
              
              'YSplitter': new yfiles.ClassDefinition(function() {
                return {
                  '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
                  
                  'constructor': function(/*Element*/ element, /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent*/ component, /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout*/ container, /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion) {
                    yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
                    this.$init1();
                    this.$container = container;
                    this.$region = layoutRegion;
                    this.$component = component;
                    this.$horizontal = this.$region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP || this.$region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.BOTTOM;
                    this.$topleft = this.$region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP || this.$region === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT;
                    element.addEventListener("mouseover", yfiles.lang.delegate(this.$onMouseOver, this), false);
                    element.addEventListener("mouseout", yfiles.lang.delegate(this.$onMouseOut, this), false);

                    element.addEventListener("mousedown", yfiles.lang.delegate(this.$onMouseDown, this), false);
                    window.document.addEventListener("mouseup", yfiles.lang.delegate(this.$onDocumentMouseUp, this), true);
                    window.document.addEventListener("mousemove", yfiles.lang.delegate(this.$onDocumentMouseMove, this), true);
                  },
                  
                  /**
                   * @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout
                   * @private
                   */
                  '$container': null,
                  
                  /**
                   * @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.YResizableComponent
                   * @private
                   */
                  '$component': null,
                  
                  /**
                   * @type yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion
                   * @private
                   */
                  '$region': null,
                  
                  /**
                   * @type boolean
                   * @private
                   */
                  '$horizontal': false,
                  
                  /**
                   * @type boolean
                   * @private
                   */
                  '$topleft': false,
                  
                  /**
                   * @type boolean
                   * @private
                   */
                  '$dragging': false,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$dragStartMousePosition': 0,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$dragStartSize': 0,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$fixedChildSize': 0,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$dragStartSplitterPosition': 0,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$dragStartMaxSize': 0,
                  
                  /**
                   * @type double
                   * @private
                   */
                  '$dragStartMinSize': 20,
                  
                  // add data-minSize attribute or use css min-width/height?
                  '$onDragStart': function(/*Event*/ evt) {
                    this.$dragging = true;
                    var /*MouseEvent*/ mouseEvent = (/*(MouseEvent)*/evt);
                    var /*double*/ position = this.$horizontal ? mouseEvent.pageY : mouseEvent.pageX;
                    this.$dragStartMousePosition = position;
                    var /*yfiles.geometry.RectD*/ bounds = this.$component.getDimensions().bounds;
                    this.$dragStartSize = this.$horizontal ? bounds.height : bounds.width;
                    this.$fixedChildSize = this.$horizontal ? bounds.width : bounds.height;
                    var /*string*/ positionAtt = this.$horizontal ? "top" : "left";
                    this.$dragStartSplitterPosition = parseFloat((/*(HTMLElement)*/this.element).style.getPropertyValue(positionAtt));

                    var /*double*/ available = 0;
                    var /*yfiles.demo.IComponent*/ centerComponent = null;
                    var /*yfiles.util.IEnumerator*/ tmpEnumerator;
                    for (tmpEnumerator = this.$container.children.getEnumerator(); tmpEnumerator.moveNext(); ) {
                      var /*yfiles.demo.IComponent*/ child = tmpEnumerator.current;
                      {
                        var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion = yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutRegion(child);
                        if (layoutRegion === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER) {
                          centerComponent = child;
                          break;
                        }
                      }
                    }
                    if (centerComponent !== null) {
                      var /*yfiles.geometry.RectD*/ centerBounds = centerComponent.getDimensions().bounds;
                      available = this.$horizontal ? centerBounds.height : centerBounds.width;
                    }
                    this.$dragStartMaxSize = this.$dragStartSize + available;
                  },
                  
                  '$onDrag': function(/*Event*/ evt) {
                    var /*MouseEvent*/ mouseEvent = (/*(MouseEvent)*/evt);
                    var /*double*/ position = this.$horizontal ? mouseEvent.pageY : mouseEvent.pageX;
                    var /*double*/ delta = position - this.$dragStartMousePosition;
                    var /*double*/ newSize = this.$topleft ? this.$dragStartSize + delta : this.$dragStartSize - delta;
                    newSize = Math.max(Math.min(newSize, this.$dragStartMaxSize), this.$dragStartMinSize);

                    var /*string*/ splitterPos = delta + this.$dragStartSplitterPosition + "px";
                    var /*string*/ positionAtt = this.$horizontal ? "top" : "left";

                    var /*yfiles.geometry.SizeD*/ futureSize = (this.$horizontal ? new yfiles.geometry.SizeD(this.$fixedChildSize, newSize) : new yfiles.geometry.SizeD(newSize, this.$fixedChildSize)).clone();
                    this.$component.newSize = futureSize;
                    this.$component.changeSize = true;
                    this.setStyleProperty(positionAtt, splitterPos);
                    this.$container.layoutChildren();

                  },
                  
                  '$onDragEnd': function(/*Event*/ evt) {
                    this.$dragging = false;
                  },
                  
                  '$onDocumentMouseMove': function(/*Event*/ evt) {
                    if (this.$dragging) {
                      this.$onDrag(evt);
                      evt.preventDefault();
                    }
                  },
                  
                  '$onDocumentMouseUp': function(/*Event*/ evt) {
                    this.$onDragEnd(evt);
                  },
                  
                  '$onMouseDown': function(/*Event*/ evt) {
                    this.$onDragStart(evt);
                    evt.preventDefault();
                  },
                  
                  '$onMouseOver': function(/*Event*/ evt) {},
                  
                  '$onMouseOut': function(/*Event*/ evt) {},
                  
                  '$init1': function() {
                    this.$region = yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP;
                  }
                  
                };
              }),
              
              'BorderLayoutComparer': new yfiles.ClassDefinition(function() {
                return {
                  
                  '$with': [yfiles.collections.IComparer],
                  
                  'constructor': function(/*yfiles.demo.IContainer*/ borderLayout) {
                    this.$borderLayout = borderLayout;
                  },
                  
                  /**
                   * @type yfiles.demo.IContainer
                   * @private
                   */
                  '$borderLayout': null,
                  
                  /**
                   * @return {int}
                   * @private
                   */
                  '$getWeight': function(/*yfiles.demo.IComponent*/ x) {
                    var /*yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion*/ layoutRegion = yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutRegion(x);
                    switch (layoutRegion) {
                      case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT:
                      case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.RIGHT:
                        return (yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutArrangement(this.$borderLayout) === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement.SIDEBAR) ? 0 : 1;
                      case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP:
                      case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.BOTTOM:
                        return (yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.getLayoutArrangement(this.$borderLayout) === yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement.SIDEBAR) ? 1 : 0;
                      case yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER:
                        return yfiles.system.Math.INT32_MAX_VALUE;
                    }
                    return 0;
                  },
                  
                  /** @return {int} */
                  'compare': function(/*yfiles.demo.IComponent*/ x, /*yfiles.demo.IComponent*/ y) {
                    var /*int*/ weightX = this.$getWeight(x);
                    var /*int*/ weightY = this.$getWeight(y);
                    return weightX - weightY;
                  },
                  
                  /** @lends yfiles.demo.DefaultApplicationParserBackend */
                  '$static': {
                    /**
                     * @type yfiles.collections.IDictionary
                     * @private
                     */
                    'WEIGHT': null,
                    
                    '$clinit': function() {
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT = new yfiles.collections.Dictionary/*<yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion, int>*/();
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT.put(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.LEFT, 0);
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT.put(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.RIGHT, 0);
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT.put(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.TOP, 1);
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT.put(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.BOTTOM, 1);
                      yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.BorderLayoutComparer.WEIGHT.put(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.CENTER, yfiles.system.Math.INT32_MAX_VALUE);
                    }
                    
                  }
                };
              }),
              
              /**
               * @return {yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion}
               * @private
               */
              'getLayoutRegion': function(/*yfiles.demo.IComponent*/ component) {
                var /*string*/ layoutAttribute = component.element.getAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_REGION);
                if (layoutAttribute !== null) {
                  try {
                    var o = yfiles.lang.Enum.parse(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion.$class, layoutAttribute, true);
                    return /*(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutRegion)*/o;
                  } catch ( /*yfiles.lang.Exception*/ e ) {
                    {
                      throw new yfiles.system.ArgumentException.FromMessage("Unknown layout region: " + layoutAttribute);
                    }
                  }
                }
                throw new yfiles.system.ArgumentException.FromMessage("No layout region set for border layout child " + component.element.getAttribute("id"));
              },
              
              /**
               * @return {yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement}
               * @private
               */
              'getLayoutArrangement': function(/*yfiles.demo.IContainer*/ borderLayout) {
                var /*string*/ arrangementAttribute = borderLayout.element.getAttribute(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.DATA_ATTRIBUTE_LAYOUT_ARRANGEMENT);
                if (arrangementAttribute !== null) {
                  try {
                    var o = yfiles.lang.Enum.parse(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement.$class, arrangementAttribute, true);
                    return /*(yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement)*/o;
                  } catch ( /*yfiles.lang.Exception*/ e ) {
                    {
                      throw new yfiles.system.ArgumentException.FromMessage("Unknown layout arrangement: " + arrangementAttribute);
                    }
                  }
                }
                return yfiles.demo.DefaultApplicationParserBackend.YBorderLayout.LayoutArrangement.HEADLINE;
              }
              
            }
          };
        }),
        
        'YComboBox': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YCommandComponent,
            
            '$with': [yfiles.demo.IComboBox],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YCommandComponent.call(this, element);
              this.selectElement = /*(HTMLSelectElement)*/element;
              element.setAttribute("size", "1");
              this.addEventListener(yfiles.lang.delegate(this.$maybeExecuteCommand, this));
            },
            
            /**
             * Backing field for below property 
             * @type HTMLSelectElement
             * @private
             */
            '$selectElement': null,
            
            /**
             * @type HTMLSelectElement
             * @private
             */
            'selectElement': {
              'get': function() {
                return this.$selectElement;
              },
              'set': function(/*HTMLSelectElement*/ value) {
                this.$selectElement = value;
              }
            },
            
            /**
             * @type yfiles.collections.IEnumerable
             * @private
             */
            '$items': null,
            
            /** @type yfiles.collections.IEnumerable */
            'items': {
              'get': function() {
                return this.$items;
              },
              'set': function(/*yfiles.collections.IEnumerable<string>*/ value) {
                if (!this.$isEmpty()) {
                  yfiles.demo.DefaultApplicationParserBackend.YToolkit.removeAllChildren(/*(HTMLElement)*/this.element);
                }

                this.$items = value;
                this.enabled = !this.$isEmpty();

                if (value !== null) {
                  var /*yfiles.util.IEnumerator*/ tmpEnumerator;
                  for (tmpEnumerator = value.getEnumerator(); tmpEnumerator.moveNext(); ) {
                    var /*string*/ s = tmpEnumerator.current;
                    {
                      var /*Element*/ optionElement = document.createElement("option");
                      optionElement.textContent = s;
                      this.element.appendChild(optionElement);
                    }
                  }
                  this.$setSelectedIndexCore(0);
                } else {
                  this.$maybeExecuteCommand(null);
                }
              }
            },
            
            /**
             * @return {boolean}
             * @private
             */
            '$isEmpty': function() {
              return this.$items === null || yfiles.collections.EnumerableExtensions./*<string>*/count(this.$items) === 0;
            },
            
            '$setSelectedIndexCore': function(/*int*/ value) {
              this.selectElement.selectedIndex = value;
              this.$maybeExecuteCommand(null);
            },
            
            /** @type int */
            'length': {
              'get': function() {
                return this.selectElement.length;
              }
            },
            
            /** @return {string} */
            'elementAt': function(/*int*/ index) {
              var /*Node*/ elementAt = this.selectElement.options.item(index);
              return elementAt === null ? null : elementAt.textContent;
            },
            
            /** @type int */
            'selectedIndex': {
              'get': function() {
                return this.selectElement.selectedIndex;
              },
              'set': function(/*int*/ value) {
                if (value !== this.selectElement.selectedIndex) {
                  this.$setSelectedIndexCore(value);
                }
              }
            },
            
            /** @type string */
            'selectedItem': {
              'get': function() {
                return this.elementAt(this.selectedIndex);
              },
              'set': function(/*string*/ value) {
                var /*int*/ n = this.length;
                for (var /*int*/ i = 0; i < n - 1; i++) {
                  if (yfiles.system.StringExtensions.isEqual(value, this.elementAt(i))) {
                    this.selectedIndex = i;
                    break;
                  }
                }
              }
            },
            
            'addEventListener': function(/*function(Event)*/ handler) {
              this.element.addEventListener("change", handler, false);
            },
            
            'removeEventListener': function(/*function(Event)*/ handler) {
              this.element.removeEventListener("change", handler, false);
            }
            
          };
        }),
        
        'YCheckBox': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YCommandComponent,
            
            '$with': [yfiles.demo.ICheckBox],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YCommandComponent.call(this, element);
              this.checkBoxElement = /*(HTMLInputElement)*/element;
              this.addEventListener(yfiles.lang.delegate(this.$maybeExecuteCommand, this));
            },
            
            /**
             * Backing field for below property 
             * @type HTMLInputElement
             * @private
             */
            '$checkBoxElement': null,
            
            /**
             * @type HTMLInputElement
             * @private
             */
            'checkBoxElement': {
              'get': function() {
                return this.$checkBoxElement;
              },
              'set': function(/*HTMLInputElement*/ value) {
                this.$checkBoxElement = value;
              }
            },
            
            /** @type boolean */
            'isChecked': {
              'get': function() {
                return this.checkBoxElement.checked;
              },
              'set': function(/*boolean*/ value) {
                if (value !== this.checkBoxElement.checked) {
                  this.checkBoxElement.checked = value;
                  this.$maybeExecuteCommand(null);
                }
              }
            },
            
            'addEventListener': function(/*function(Event)*/ handler) {
              this.element.addEventListener("change", handler, false);
            },
            
            'removeEventListener': function(/*function(Event)*/ handler) {
              this.element.removeEventListener("change", handler, false);
            }
            
          };
        }),
        
        'YCollapsiblePane': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YPanel,
            
            '$with': [yfiles.demo.ICollapsiblePane],
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YPanel.call(this, element);
              this.$init3();
            },
            
            /**
             * @type Element
             * @private
             */
            '$header': null,
            
            /**
             * @type Element
             * @private
             */
            '$content': null,
            
            'collapse': function() {
              if (this.collapseStyle === yfiles.demo.CollapseStyle.NONE) {
                return;
              }
              if (this.isExpanded) {
                yfiles.demo.ElementExtensions.addClass(this.element1, "y-collapsed");
              }
              this.isExpanded = false;
            },
            
            'expand': function() {
              if (this.collapseStyle === yfiles.demo.CollapseStyle.NONE) {
                return;
              }
              if (!this.isExpanded) {
                yfiles.demo.ElementExtensions.removeClass(this.element1, "y-collapsed");
              }
              this.isExpanded = true;
            },
            
            '$toggle': function() {
              if (this.isExpanded) {
                this.collapse();
              } else {
                this.expand();
              }
            },
            
            /**
             * Backing field for below property 
             * @type boolean
             * @private
             */
            '$isExpanded': false,
            
            /** @type boolean */
            'isExpanded': {
              'get': function() {
                return this.$isExpanded;
              },
              'set': function(/*boolean*/ value) {
                this.$isExpanded = value;
              }
            },
            
            /** @type string */
            'header': {
              'get': function() {
                return (/*(HTMLElement)*/this.$header).innerHTML;
              },
              'set': function(/*string*/ value) {
                if (this.$header === null) {
                  this.$header = document.createElement("span");
                  this.$header.setAttribute("class", "y-collapsible-pane-header");
                  if (this.$content !== null) {
                    this.element1.insertBefore(this.$header, this.$content);
                  } else {
                    this.element1.appendChild(this.$header);
                  }
                  this.$header.addEventListener("click", (function(/*Event*/ e) {
                    this.$toggle();
                  }).bind(this), false);
                }
                (/*(HTMLElement)*/this.$header).innerHTML = value;
              }
            },
            
            /** @type Element */
            'content': {
              'get': function() {
                return this.$content;
              },
              'set': function(/*Element*/ value) {
                if (this.$content !== null) {
                  this.element1.replaceChild(value, this.$content);
                } else {
                  this.element1.appendChild(value);
                }
                this.$content = value;
              }
            },
            
            /**
             * Backing field for below property 
             * @type yfiles.demo.CollapseStyle
             * @private
             */
            '$collapseStyle': null,
            
            /** @type yfiles.demo.CollapseStyle */
            'collapseStyle': {
              'get': function() {
                return this.$collapseStyle;
              },
              'set': function(/*yfiles.demo.CollapseStyle*/ value) {
                this.$collapseStyle = value;
              }
            },
            
            '$init3': function() {
              this.$collapseStyle = yfiles.demo.CollapseStyle.TOP;
            }
            
          };
        }),
        
        // #endregion 
        'YToolkit': new yfiles.ClassDefinition(function() {
          return {
            
            '$with': [yfiles.demo.IToolkit],
            
            'constructor': function() {},
            
            /** @return {yfiles.demo.DefaultApplicationParserBackend.YSeparator} */
            '$createSeparator': function() {
              var /*Element*/ element = document.createElement("span");
              yfiles.demo.ElementExtensions.addClass(element, "y-separator");
              return new yfiles.demo.DefaultApplicationParserBackend.YSeparator(element);
            },
            
            /** @return {yfiles.demo.DefaultApplicationParserBackend.YButton} */
            '$createButton': function(/*string*/ label) {
              var /*Element*/ button = document.createElement("button");
              button.setAttribute("class", "y-button");
              (/*(HTMLElement)*/button).innerHTML = label;
              return new yfiles.demo.DefaultApplicationParserBackend.YButton(button);
            },
            
            /** @return {yfiles.demo.DefaultApplicationParserBackend.YToolBar} */
            '$createToolBar': function() {
              var /*Element*/ e = document.createElement("div");
              e.setAttribute("class", "y-toolbar");
              return new yfiles.demo.DefaultApplicationParserBackend.YToolBar(e);
            },
            
            /** @return {yfiles.demo.IContextMenu} */
            'createContextMenu': function() {
              var /*Element*/ contextMenu = document.createElement("ul");
              document.body.appendChild(contextMenu);
              contextMenu.setAttribute("class", "y-context-menu");
              return new yfiles.demo.DefaultApplicationParserBackend.YContextMenu(contextMenu);
            },
            
            /** @return {yfiles.demo.IButton} */
            '$createMenuItem': function(/*string*/ label) {
              var /*Element*/ button = document.createElement("li");
              button.setAttribute("class", "y-menu-item");
              (/*(HTMLElement)*/button).innerHTML = label;
              return new yfiles.demo.DefaultApplicationParserBackend.YButton(button);
            },
            
            /** @lends yfiles.demo.DefaultApplicationParserBackend */
            '$static': {
              /**
               * @type yfiles.demo.DefaultApplicationParserBackend.YToolkit
               * @private
               */
              'instanceF': null,
              
              /** @type yfiles.demo.DefaultApplicationParserBackend.YToolkit */
              'INSTANCE': {
                'get': function() {
                  return (yfiles.demo.DefaultApplicationParserBackend.YToolkit.instanceF) !== null ? yfiles.demo.DefaultApplicationParserBackend.YToolkit.instanceF : (yfiles.demo.DefaultApplicationParserBackend.YToolkit.instanceF = new yfiles.demo.DefaultApplicationParserBackend.YToolkit());
                }
              },
              
              'removeAllChildren': function(/*HTMLElement*/ element) {
                if (element.children !== undefined) {
                  var /*int*/ n = element.children.length;
                  for (var /*int*/ i = 0; i < n; i++) {
                    var /*Element*/ child = /*(Element)*/element.children[0];
                    element.removeChild(child);
                  }
                }
              },
              
              /** @type yfiles.geometry.SizeD */
              'BROWSER_SIZE': {
                'get': function() {
                  if (!"undefined".equals(typeof(window["innerWidth"]))) {
                    return new yfiles.geometry.SizeD(window.innerWidth, window.innerHeight);
                  }
                  if (!"undefined".equals(typeof(document["documentElement"])) && /*(double)*/document.documentElement["clientWidth"] !== 0) {
                    return new yfiles.geometry.SizeD(/*(double)*/document.documentElement["clientWidth"], /*(double)*/document.documentElement["clientHeight"]);
                  }
                  if (!"undefined".equals(typeof(document.body))) {
                    return new yfiles.geometry.SizeD(document.body.clientWidth, document.body.clientHeight);
                  }
                  return new yfiles.geometry.SizeD(0, 0);
                }
              },
              
              /** @type boolean */
              'IS_LANDSCAPE': {
                'get': function() {
                  var /*yfiles.geometry.SizeD*/ size = yfiles.demo.DefaultApplicationParserBackend.YToolkit.BROWSER_SIZE;
                  return size.width > size.height;
                }
              },
              
              /** @type boolean */
              'IS_PORTRAIT': {
                'get': function() {
                  return !yfiles.demo.DefaultApplicationParserBackend.YToolkit.IS_LANDSCAPE;
                }
              }
              
            }
          };
        }),
        
        'YFramerateCounter': new yfiles.ClassDefinition(function() {
          return {
            '$extends': yfiles.demo.DefaultApplicationParserBackend.YComponent,
            
            'constructor': function(/*Element*/ element) {
              yfiles.demo.DefaultApplicationParserBackend.YComponent.call(this, element);
              this.$init1();
            },
            
            /**
             * @type long
             * @private
             */
            '$lastUpdate': null,
            
            /**
             * @type double
             * @private
             */
            '$fps': 0,
            
            /**
             * @type int
             * @private
             */
            '$smoothing': 1,
            
            /**
             * @type int
             * @private
             */
            '$updateInterval': 1000,
            
            /** @type int */
            'smoothing': {
              'get': function() {
                return this.$smoothing;
              },
              'set': function(/*int*/ value) {
                this.$smoothing = value;
              }
            },
            
            /** @type int */
            'updateInterval': {
              'get': function() {
                return this.$updateInterval;
              },
              'set': function(/*int*/ value) {
                this.$updateInterval = value;
              }
            },
            
            'start': function() {
              setTimeout(yfiles.lang.delegate(this.$tick, this), 1);
              setTimeout(yfiles.lang.delegate(this.$drawFPSTimeout_Tick, this), this.$updateInterval);
            },
            
            '$tick': function() {
              var /*long*/ now = Date.now();
              var /*long*/ d = now - this.$lastUpdate;
              var /*long*/ current = d !== 0 ? 1000 / d : 0;
              this.$fps += (current - this.$fps) / this.smoothing;
              this.$lastUpdate = now;

              setTimeout(yfiles.lang.delegate(this.$tick, this), 1);
            },
            
            '$drawFPSTimeout_Tick': function() {
              this.$drawFPS();
              setTimeout(yfiles.lang.delegate(this.$drawFPSTimeout_Tick, this), this.$updateInterval);
            },
            
            '$drawFPS': function() {
              (/*(HTMLElement)*/this.element).innerHTML = (/*(Number)*/(this.$fps)).toFixed(1) + " fps";
            },
            
            '$init1': function() {
              this.$lastUpdate = Date.now();
            }
            
          };
        })
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.LayoutDirection
   */
  /*public*/ exports.LayoutDirection = new yfiles.EnumDefinition(function() {
    /** @lends yfiles.demo.LayoutDirection */
    return {
      'VERTICAL': 0,
      'HORIZONTAL': 1,
      'UNKNOWN': 2
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.DemoFrameworkConstants
   */
  /*public*/ exports.DemoFrameworkConstants = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.DemoFrameworkConstants.prototype */
    return {
      
      /** @lends yfiles.demo.DemoFrameworkConstants */
      '$static': {
        /** @type string */
        'DATA_ATTRIBUTE_LAYOUT_ORIENTATION': "data-layout-orientation"
        
      }
    };
  })


});
yfiles.module("yfiles.demo", function(exports) {
  /**
   * @class yfiles.demo.ElementExtensions
   */
  /*public*/ exports.ElementExtensions = new yfiles.ClassDefinition(function() {
    /** @lends yfiles.demo.ElementExtensions.prototype */
    return {
      
      /** @lends yfiles.demo.ElementExtensions */
      '$static': {
        /** @return {Element} */
        'addClass': function(/*Element*/ e, /*string*/ className) {
          var /*string*/ classes = e.getAttribute("class");
          if (classes === null || yfiles.system.StringExtensions.stringEquals("", classes)) {
            e.setAttribute("class", className);
          } else if (!yfiles.demo.ElementExtensions.hasClass(e, className)) {
            e.setAttribute("class", classes + ' ' + className);
          }
          return e;
        },
        
        /** @return {Element} */
        'removeClass': function(/*Element*/ e, /*string*/ className) {
          var /*string*/ classes = e.getAttribute("class");
          if (classes !== null && !yfiles.system.StringExtensions.stringEquals("", classes)) {
            if (yfiles.system.StringExtensions.stringEquals(classes, className)) {
              e.setAttribute("class", "");
            } else {
              var /*string*/ result = "";
              var /*string[]*/ arr;
              var /*int*/ i;
              for (i = 0, arr = yfiles.system.StringExtensions.split(classes, [' ']); i < arr.length; i++) {
                var /*string*/ s = arr[i];
                if (yfiles.system.StringExtensions.isNotEqual(s, className)) {
                  result += result.length === 0 ? s : " " + s;
                }
              }
              e.setAttribute("class", result);
            }
          }
          return e;
        },
        
        /** @return {boolean} */
        'hasClass': function(/*Element*/ e, /*string*/ className) {
          var /*string*/ classes = e.getAttribute("class");
          var /*RegExp*/ r = new RegExp("\b" + className + "\b", "");
          return r.test(classes);
        }
        
      }
    };
  })


});});