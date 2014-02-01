
/*console.isDebug = true;

window.console.real = window.console.log;
window.console.log = function(stuff) {
	if(this.isDebug)
		this.real(stuff);
};*/

var chart; //Global Chart Object!

/************************************/
/* Load KeyLines and general setup  */ 
/************************************/

$(window).load(function () {

  //KeyLines.mode(readCookie('mode') || 'auto');
  //KeyLines.setCanvasPaths('assets/');
  //KeyLines.setFlashPaths('public/keylines.swf', 'vendor/swfobject.js', 'vendor/expressInstall.swf');
  //KeyLines.createChart('kl', afterChartCreated);
  
  KeyLines.mode('canvas');
  //Set the canvas asset path if using 'auto' or 'canvas'
  KeyLines.setCanvasPaths('resources/js/keylines/assets/');
  KeyLines.createChart('network-graph', 
						  1200, 
						  800,  
						  afterChartCreated);
});

function afterChartCreated(err, loadedChart) {
  
  $('#standardlayout').click(applyStandardLayout);
  $('#hierarchylayout').click(applyHierarchyLayout);
  $('#radiallayout').click(applyRadialLayout);
  $('#structurallayout').click(applyStructuralLayout);
  $('#uncombine').click(uncombineNodes);
  $('#fullScreen').click(fullScreenMode);

  chart = loadedChart;
  chart.bind('dblclick', expandClickedData);
  chart.bind('click', handleClickEvent);
  chart.interactionOptions({handMode:true});
  
  getJson(null, true);
  
  /*var data = jsonData;
  console.log("data : "+data);
  
  var items = parseJson(data);
  //for(item in items)
  //console.log(items[item]);
  
  chart.load({type: 'LinkChart', items: items}, function() {
  	chart.zoom('fit', {}, applyStandardLayout);
  	
   });*/
  	
  	//setTimeout(function() {
	  	
  	//}, 1000);
  	
  	/*chart.bind('viewchange', function(change) {
  		chart.arrange('grid', [521,522], {fit: true, animate: true, tightness: 20});
  		console.log("Triggers! : "+change);
  		if(change == 'layout') {
  			chart.each({type:'node'}, function (item) {
			  console.log(item.t);
		      if (item.w && item.h) {
		        return chart.contains(item);
		      }
			});
  		}
    });*/
  	
  	//var arr = [[10,14,16,12,15,17,18,19], [13,22,21,20,26,23,24,25]];
  	/*var arr = [522, 521];
  	setTimeout(function() {
	  	
	  	chart.arrange('grid', arr, {fit: true, animate: true, tightness : 10});
  	}, 1000);*/
  	/*setTimeout(function() {
	  	chart.arrange('grid', arr[1], {fit: true, animate: true, tightness : 10});
	  	}, 2000);*/
  	/*setTimeout(function() {
	  	var arr = [[10,14,16,12,15,17,18,19], [13,22,21,20,26,23,24,25]];
	  	
	  	chart.arrange('grid', arr[1], {fit: true, animate: true, tightness : 10});
  	}, 1000);*/
  	
  	/*setTimeout(function() {

	  	chart.combo().combine(
		{
			ids: combineArr,
			label: 'Ports'
		},
		{
	    	animate: true
	    },
	    function(comboIds) {
			console.log("INSIDEEEE : "+comboIds);
			clusteredIds.push(comboIds);
	    }
	  );
	  //chart.arrange('circle', [10,14,16,12,15,17], {fit: true, animate: true, tightness : 2});
	  //chart.arrange('grid', [10,14,16,12,15,17], {fit: true, animate: true, tightness : 1.5});
	  //chart.arrange('radial', [10,14,16,12,15,17], {fit: true, animate: true, tightness : 2});
	  
	  //var arr = [[10,14,16,12,15,17,18,19], [13,22,21,20,26,23,24,25]]
	  
	  //chart.arrange('grid', arr[0], {fit: true, animate: true, tightness : 10});
	  //chart.arrange('grid', arr[1], {fit: true, animate: true, tightness : 10});
  	}, 400);*/
  //});
  
  chart.bind('dragstart', function (dragtype, id) {
    if (dragtype === 'move') {
      var item = chart.getItem(id);
      if (item.w && item.h) {
        return chart.contains(item);
      }
    }
  });
  
  //callCypher(ratingsQuery, true);
  
  /*setInterval(function() {
  	
  	var parentID = Math.floor(Math.random() * 101);
  	var outgoingID = Math.floor(Math.random() * 101);
  	
  	var sampleJson = '[{"parentDevice":{"id":'+parentID+',"deviceName":"Zeus'+parentID+'","deviceType":null,"value":null,"cost":null},' +
  			'"outgoingDevices":[{"id":'+outgoingID+',"deviceName":"Device ID'+outgoingID+'","deviceType":null,"value":"51","cost":"49"},' +
  			'{"id":'+(outgoingID+1)+',"deviceName":"Egyptian'+(outgoingID+1)+'","deviceType":null,"value":"83","cost":"21"},' +
  			'{"id":'+(outgoingID+2)+',"deviceName":"Norse'+(outgoingID+2)+'","deviceType":null,"value":"78","cost":"37"},' +
  			'{"id":'+(outgoingID+3)+',"deviceName":"Polaris'+(outgoingID+3)+'","deviceType":null,"value":"91","cost":"61"}],"incomingDevices":[]}]';

  	var theItems = parseJson(JSON.parse(sampleJson));
  	chart.expand(theItems, {fit: true, animate: true, tidy: true});
  	
  }, 3000);*/

}


/*************************************/
/* Calling Neo4j to get data */
/*************************************/ 
function getJson(queryString, firstTime) {

  $.ajax({
    type: 'GET',
    url:'/networkvisualizer/json',
    //data: JSON.stringify({query: queryString, params: {}}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (json) {
      var data = json;
	  console.log("data : "+data);
		  
	  var items = parseJson(data);
	  
      if (firstTime) {
		chart.load({type: 'LinkChart', items: items}, function() {
			chart.zoom('fit', {}, applyStandardLayout);
      	});
      }
      else {
        chart.expand(items);
      }
    },
    error: function (xhr) {
      console.log(xhr);
    }
  });
}


function expandClickedData(clickedID, x, y) {
	console.log("Clicked ID : Double Click : "+clickedID);
	
	//calculateShortestPaths(5, 8);
	
	/*setTimeout(function() {
		console.log("UnCombine called before");
		
		//chart.combo().uncombine(chart.selection(), {animate: true, full: true});
		console.log("CLUSTERED ID : "+clusteredIds);
		for(var i in clusteredIds)
			chart.combo().uncombine(clusteredIds[i], {animate: true, full: true});
		
		console.log("UnCombine called after");
	}, 3000);*/
}

function uncombineNodes() {
	chart.combo().uncombine(chart.selection(), {animate: true, full: false, tidy: true, time: 500, select: false});
	//chart.expand(chart.selection(), {fit: true, animate: true, tidy: true});
	console.log("Chart expanded");
}

/**
 * A couple of helper methods
 * @param {} url
 * @return {}
 */
function cleanURL(url) {
  return url.substring(url.lastIndexOf('/')+1);
}

/**
 * Helper function to return the substring'd
 * part of the string, which comes after the 'char + 1'
 * passed in as the parameter.
 * @param {} str
 * @param {} char
 * @return {} substring'd str
 */
function getSubStringAfterLastIndexOfChar(str, char) {
  return str.substring(str.lastIndexOf(char) + 1);
}

/*function filterPortNames(ports) {
	var filteredName;
	if(ports) {
		console.log("Port name : Inside filterPortNames() : "+ports);
		filteredName = ports.replace(new RegExp("Device", "g"), "");
	}
	return filteredName;
}*/

/**
 * Array which holds the (DOM)ID's
 * which are to be combined/clustered
 * after the graph is rendered or maybe,
 * we can use this for an event triggered.
 * @type Array 
 */
var combineArr = [];

var clusteredIds = [];

/**
 * Instead of extending the Array prototype,
 * it's good to create a separate function,
 * since we add extra property when we
 *  extend the Array's prototype.
 */
function arrayContains(array, item) {
	console.log("Inside Array Contains Custom Method : Array : "+array+" : Item : "+item);
	if(Array.indexOf) { //This guy will be present only for Modern Browsers.
		if(array.indexOf(item) == -1) {
			return true;
		} else {
		return false;
	  }
	} else {
		var i = array.length;
	    while (i--) {
	       if (array[i] === item) {
	           return true;
	       }
	    }
	    return false;
	}
}

function parseDevice(device) {

	//var parentDevice = device.parentDevice;
	//var parentDevice = device;
	var deviceId = device.id;
	var deviceName = device.deviceName;
	var deviceType = device.deviceType;
	console.log("Inside Parse Device : Device Type : "+deviceType);
	var width = 300;
	var height = 120;
	
	if(deviceType == "Virtual Machine") {
		width = 100;
		height = 80;
	}
	
	var deviceNode = {
	    id: deviceId,
	    type: 'node',
	    t: deviceName,
	    u: nodeIcon(deviceType),
	    w: width,
	    h: height,
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    d: {  //store the type of the item for later - will be used for subsequent queries
	      baseType: deviceType
	    }
     };
  return deviceNode;
}

function parsePort(port) {
	var portId = port.id;
	var portName = port.portName;
	var parsedPortName = getSubStringAfterLastIndexOfChar(portName, '-');
	console.log("Has Port : Port Name : "+portName+ " : Port ID : "+portId+ " : Parsed Port Name : "+parsedPortName);
	
	var portNode = {
	    id: portId,
	    type: 'node',
	    t: parsedPortName,
	    //u: nodeIcon('device'),
	    w: 20,
	    h: 20,
	    c: 'rgb(30,144,255)',
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    d: {
	      type: port.portType,  //store the type of the item for later - will be used for subsequent queries
	      baseType: 'Port'
	    }
    };
    return portNode;
}

function parseLink(connections, type) {
	var connectedLinks = [];
	var device = connections;
	
	if(type && type == 'has_port') {
		var parentDevice = device.parentDevice;
		var deviceId = parentDevice.id;
		//var deviceName = parentDevice.deviceName;
		var hasPorts = device.hasPorts;
		for(var i in hasPorts) {
			var hasPort = hasPorts[i];
			var link = {
			    type: 'link',
			    id1: deviceId,
			    id2: hasPort.id,
			    id: deviceId + '-' + hasPort.id,
			    //t: labelDictionary[item.type],
			    //t: 'has_port',
			    a2: true,
			    //b1: 0,
			    //b2: 0,
			    c: 'rgb(55, 55, 255)',
			    w: 2,
			    d: {
			      baseType: 'Link - Has_Port'
			    }/*,
			    //g: linkGlyph(device),
			    d: {
			      type: outgoingDevices[i].cost  //This can be used to calculate weighted shortest paths b/n nodes.
			    }*/
			  };
		  connectedLinks.push(link);
		}
	} else if (type && type == 'has_vm') {
		var deviceId = device.parentDevice.id;
		//var deviceName = parentDevice.deviceName;
		var hasVms = device.hasVirtualMachines;
		console.log("Type == 'has_vm' : hasVm's length : "+hasVms.length);
		for(var i in hasVms) {
			var hasVM = hasVms[i];
			console.log("HAS VIRTUAL MACHINEEEEEEEEEEEEEEE : ");
			console.log(hasVM);
			var link = {
			    type: 'link',
			    id1: deviceId,
			    id2: hasVM.id,
			    id: deviceId + '-' + hasVM.id,
			    //t: labelDictionary[item.type],
			    //t: 'has_port',
			    a2: true,
			    //b1: 0,
			    //b2: 0,
			    c: 'rgb(55, 55, 255)',
			    w: 2,
			    d: {
			      baseType: 'Link - Has_VM'
			    }/*,
			    //g: linkGlyph(device),
			    d: {
			      type: outgoingDevices[i].cost  //This can be used to calculate weighted shortest paths b/n nodes.
			    }*/
			  };
			  console.log("HAS VIRTUAL MACHINE LINK : ");
			  console.log(link);
		  connectedLinks.push(link);
		}
	} else {
		console.log("Line number 305.. Comes in Else Part!");
		var connectedDevices = connections.connectedDevices;
		console.log("Connected Devices Lenght : "+connectedDevices.length);
		
		for(var i in connectedDevices) {
			var connectedDevice = connectedDevices[i];
			var id = connectedDevice.id;
			var uniqueLinkId = connectedDevice.connectedPorts;
			var latency = connectedDevice.latency;
			var availableBandwidth = connectedDevice.availableBandwidth;
			var linkCapacity = connectedDevice.linkCapacity;
			console.log("uniqueLinkId : "+uniqueLinkId+" : latency : "+latency+ " : availableBandwidth : "+availableBandwidth+" : linkCapacity : "+linkCapacity);
			
			var link = {
			    type: 'link',
			    id1: device.parentDevice.id,
			    id2: id,
			    //id: (device.parentDevice.id)+i+ '-' + id, //TODO: Need to FIX this GUY!
			    //id: uniqueLinkId,
			    id: connectedDevice.portId,
			    //t: labelDictionary[item.type],
			    //t: 'Port Type: '+sourcePort.portType,
			    //t: 'Ports: '+uniqueLinkId+'\nBandwidth: '+availableBandwidth+'\nLatency: '+latency+'\nLink Capacity: '+linkCapacity,
			    //t: 'Ports: '+filterPortNames(uniqueLinkId),
			    t: 'Ports: '+connectedDevice.originalPortNames,
			    //a1: true,
			    //a2: true,
			    //c: 'rgb(55, 55, 255)',
			    //g: linkGlyph(device),
			    c: getLinkColorByBandwidthValue(availableBandwidth),
			    w: getBandwidthLinkSizeByBandwidthValue(availableBandwidth),
			    d: { //This can be used to calculate weighted shorted paths b/n nodes
			      baseType: 'Link - Connects_To',
			      latency: latency,
			      availableBandwidth: availableBandwidth,
			      linkCapacity: linkCapacity
			    }
			  };
			connectedLinks.push(link);
		}
		
		/*var sourcePort = portConnections.sourcePort;
		var sourcePortId = sourcePort.id;
		var connectedPorts = portConnections.connectedPorts;
		for(var i in connectedPorts) {
			var connectedPort = connectedPorts[i];
			var connectedPortId = connectedPort.id;
			var link = {
			    type: 'link',
			    id1: sourcePortId,
			    id2: connectedPortId,
			    id: sourcePortId + '-' + connectedPortId,
			    //t: labelDictionary[item.type],
			    //t: 'Port Type: '+sourcePort.portType,
			    t: 'em0-em10'+'\n1000000\n300\n1.725%',
			    a1: true,
			    a2: true,
			    c: 'rgb(55, 55, 255)',
			    w: 2,
			    d: {
			      baseType: 'Link - Connects_To'  //This can be used to calculate weighted shorted paths b/n nodes
			    }
			  };
		  if(!arrayContains(combineArr, sourcePortId))
		  	combineArr.push(sourcePortId);
		  if(!arrayContains(combineArr, connectedPortId))
		  	combineArr.push(connectedPortId);
		  portConnectedLinks.push(link);
		}*/
	 }
	return connectedLinks;
}


function parseJson(data) {
	console.log("Parsing JSON");
	var json = data;
	console.log(JSON.stringify(json));
	console.log(json.length);
	//var devices = json.devicesJsonBean;
	//var ports = json.portsJsonBean;
	
	//console.log("Devices Size : "+devices.length+" : Ports Size : "+ports.length);
	//console.log("Devices : "+JSON.stringify(json.devicesJsonBean));
	//console.log("Ports : "+JSON.stringify(json.portsJsonBean));
	
	var items = [];
	
	for(var i = 0; i < json.length; i++) {
		var device = json[i];
		var parentDevice = device.parentDevice;
		var hasVirtualMachines = device.hasVirtualMachines;
		console.log("Has VM Length : "+device.hasVirtualMachines.length);
		//var hasPorts = device.hasPorts;
		//console.log("Device Name : From Json : "+device.parentDevice.deviceName+" : Has Ports Length : "+hasPorts.length);
		
		console.log("Device type == Device : "+device.deviceType +" : Parent Device : "+JSON.stringify(parentDevice));
		
		if(parentDevice.deviceType == "Device") {
			items.push(parseDevice(parentDevice));
			var links = parseLink(device);
			for(var link in links) {
				console.log(links[link]);
				items.push(links[link]);
			}
			if(hasVirtualMachines.length > 0) {
				console.log("Has VM SIZE : > 0 : "+hasVirtualMachines.length)
				for(var x = 0; x < hasVirtualMachines.length; x++) {
					items.push(parseDevice(hasVirtualMachines[x]));
					var hasVmLinks = parseLink(device, 'has_vm');
					console.log("HAS VM LINKS : LENGTH : "+hasVmLinks.length);
					for(var vm in hasVmLinks) {
						items.push(hasVmLinks[vm]);
					}
				}
			}
		}
		
		/*if(parentDevice.deviceType == "Virtual Machine") {
			items.push(parseDevice(parentDevice));
		}*/
		
		//items.push(parseDevice(device));
		/*var hasVmLinks = parseLink(device, 'has_vm');
		for(var vm in hasVmLinks) {
			items.push(hasVmLinks[vm]);
		}*/
		
		/*var hasVmLinks = parseLink(device, 'has_vm');
		for(var vm in hasVmLinks) {
			items.push(hasVmLinks[vm]);
		}*/
	 }
	 //console.log(JSON.stringify(items));
	 
	 /*for(var i = 0; i < json.length; i++) {
	 	 var device = json[i];
		 if(device.deviceType == "Device") {
			var hasVmLinks = parseLink(device, 'has_vm');
			for(var vm in hasVmLinks) {
				items.push(hasVmLinks[vm]);
			}
		}
	 }*/
	 
		/*for(var x = 0; x < hasPorts.length; x++) {
			items.push(parsePort(hasPorts[x]));
			
			var has_ports = parseLink(device, 'has_port');
			*//**
			 * Have to iterate over "has_ports" array
			 * as keylines doesn't support addition
			 * of the complete array. It can only 
			 * recognize individual Nodes/Links.
			 *//*
			for(var h in has_ports) {				
				items.push(has_ports[h]);
			}
		}
	}

	for(var j = 0; j < ports.length; j++) {
		var portConnections = ports[j];
		
		var connections = parseLink(portConnections);
		   *//**
			 * Have to iterate over "connections" array
			 * as keylines doesn't support addition
			 * of the complete array. It can only 
			 * recognize individual Nodes/Links.
			 *//*
		for(var i in connections)
			items.push(connections[i]);
	}*/
	
	return ((items != null || items.length !== 0) ? items : null);
}

function handleClickEvent(clickedID, x, y) {
	console.log("handling click event : "+clickedID);
	//for(var i in combineArr)
		//console.log("Element in combineArr : "+combineArr[i]);
	var item = chart.getItem(clickedID);
	var itemBaseType = item.d.baseType;
	console.log(item);
	console.log("Item Base Type : "+itemBaseType);
	$('#baseType').html(itemBaseType);
	if(item.type == 'node') {
		//console.log(item.d.baseType);
		//$('#baseType').html(itemBaseType);
	} else if(item.type = 'link') {
		if(itemBaseType != 'Link - Has_VM') {
			var baseTypeSpan = $('#baseType');
			var latency = item.d.latency;
			var availableBW = item.d.availableBandwidth;
			var linkCapacity = item.d.linkCapacity;
			console.log(latency+" : "+availableBW+" : "+linkCapacity);
			baseTypeSpan.append('<div style="margin-top: 5px; text-decoration: underline;">Connection Details:</div>');
			baseTypeSpan.append('<div>Latency: '+latency+'</div>');
			baseTypeSpan.append('<div>Available Bandwidth: '+availableBW+'</div>');
			baseTypeSpan.append('<div>Link Capacity: '+linkCapacity+'</div>');
		}
	}
	
	console.log("Methods of Chart : \n"+ADARA.Utils.getMethodsOfJSObject(chart, true));
		
	/*chart.combo().combine(
		{
			ids: combineArr,
			label: 'Ports'
		},
		{
	    	animate: true
	    },
	    function(comboIds) {
  			console.log("INSIDEEEE : "+comboIds);
  	    }
	  );*/	

	/*chart.expand(link, {fit: true, animate: true, tidy: true});
	chart.animateProperties({id: link.id, c: 'rgba(133,28,63,0.5)', w: 10}, {time: 500});*/
	
	/*setTimeout(function() {
		console.log("UnCombine called before");
		
		chart.combo().uncombine(chart.selection(), {animate: true, full: true});
		
		console.log("UnCombine called after");
	}, 3000);*/
}

/**
 * Calculates Shortest Path and 
 * animates/highlights the ROUTE/PATH
 * that we are interested in.  
 * @param {} id1
 * @param {} id2
 * @param {} opts
 */
function calculateShortestPaths(id1, id2, opts) {
	var paths = chart.graph().shortestPaths(id1, id2, {direction: 'any'});
	console.log('Number of hops = ' + paths.distance);  
	
	chart.selection(paths.items);
	
	console.log("PATH ITEMS: "+paths.items);
	
	//Need to reverse the array here, since we want to animate 'from' to 'to' connection/device. 
	for(item in (paths.items).reverse()) {
		
		var theItem = paths.items[item];
		console.log("Item : "+theItem);
		
		//This guy needs to be configured with arrayContains() function.
		//if(theItem.indexOf('-') != -1)
		if(!arrayContains(theItem, '-'))
			chart.animateProperties({id: theItem, c: 'rgba(133,28,63,0.5)', w: 10}, {time: 500});
	}
}

function applyStandardLayout() {
  chart.layout('standard', {fit: true, animate: true, tidy: true});
}

function applyHierarchyLayout() {
  chart.layout('hierarchy', {fit: true, animate: true, tidy: true});
}

function applyRadialLayout() { 
  chart.layout('radial', {fit: true, animate: true, tidy: true});
}

function applyStructuralLayout() {
  chart.layout('structural', {fit: true, animate: true, tidy: true});
}

function fullScreenMode() {
	console.log("Full Screen");
	KeyLines.toggleFullScreen(document.getElementById('wrapper'), '');
}

function validNode(item) {
  return item.data.name || item.data.title;
}

function validConnection(arr) {
  return validNode(arr[0]) && validNode(arr[2]);
}

var idPrefix = 'neo:';

function nodeLabel(type, item) {
  if (type === 'movie') { 
    return item.data.title;
  }
  else {
    return item.data.name; 
  }
}

var nodeIcons = {
  //'red': 'resources/images/red.png',
  //'device': 'resources/images/Axis_device_green.png'
  'Device': 'resources/images/Axis_device_green_Old.png',
  'Virtual Machine':  'resources/images/virtual_machine_48x48.png'
};

var labelDictionary = {
  'RATED'    : 'stars',
  'ACTS_IN'  : 'acts in',
  'DIRECTED' : 'directed'
};

function getBandwidthLinkSizeByBandwidthValue(bandwidth) {
	var returnSize = 2;
	if(bandwidth >= 0 && bandwidth < 25) {
		returnSize = 2;
	} else if(bandwidth >= 25 && bandwidth < 50) {
		returnSize = 4;
	} else if(bandwidth >= 50 && bandwidth < 75) {
		returnSize = 6;
	} else if(bandwidth >= 75 && bandwidth < 100) {
		returnSize = 10;
	}
	console.log("Bandwidth Value : "+bandwidth+ " : Return Size : "+returnSize);
	return returnSize;
}

function getLinkColorByBandwidthValue(bandwidth) {
	var returnColor = 'rgb(55, 55, 255)';
	if(bandwidth >= 0 && bandwidth < 25) {
		returnColor = 'rgb(55, 55, 255)';
	} else if(bandwidth >= 25 && bandwidth < 50) {
		returnColor = 'green';
	} else if(bandwidth >= 50 && bandwidth < 75) {
		returnColor = 'orange';
	} else if(bandwidth >= 75 && bandwidth < 100) {
		returnColor = 'red';
	}
	console.log("Bandwidth Value : "+bandwidth+ " : Return Color : "+returnColor);
	return returnColor;
}

function nodeIcon(type) {
  var icon = nodeIcons[type];
  icon = icon || '';  //in case the type isn't present
  return icon;
}

function linkGlyph(device) {
  /*if (item.type === 'RATED') {
    return [{c: 'rgb(50, 50, 10)', t: item.data.stars}];
  }
  return null; //other links do not have a glyph*/
  return [{c: 'rgb(50, 50, 10)', t: device.parentDevice.id}];
}
