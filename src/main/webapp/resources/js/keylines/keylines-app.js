
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
						  1250, 
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
  
  var data = jsonData;
  console.log("data : "+data);
  
  var items = parseJson(data);
  //for(item in items)
  //console.log(items[item]);
  
  chart.load({type: 'LinkChart', items: items}, function() {
  	chart.zoom('fit', {}, applyStandardLayout);
  	
	  	//var arr = [[10,14,16,12,15,17,18,19], [13,22,21,20,26,23,24,25]];
  	var arr = [[10,14,16,12,15,17,18,19], [13,22,21,20,26,23,24,25]];
  	setTimeout(function() {
	  	
	  	chart.arrange('grid', arr[0], {fit: true, animate: true, tightness : 10});
  	}, 1000);
  	setTimeout(function() {
	  	chart.arrange('grid', arr[1], {fit: true, animate: true, tightness : 10});
	  	}, 2000);
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


function parseDevice(device) {

	var parentDevice = device.parentDevice;
	var deviceId = parentDevice.id;
	var deviceName = parentDevice.deviceName;
	
	var deviceNode = {
	    id: deviceId,
	    type: 'node',
	    t: deviceName,
	    u: nodeIcon('device'),
	    w: 300,
	    h: 120
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    /*d: {
	      type: basetype  //store the type of the item for later - will be used for subsequent queries
	    }*/
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
	    c: 'rgb(30,144,255)'
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    /*d: {
	      type: basetype  //store the type of the item for later - will be used for subsequent queries
	    }*/
    };
    return portNode;
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

/**
 * Array which holds the (DOM)ID's
 * which are to be combined/clustered
 * after the graph is rendered or maybe, 
 * we can use this for an event triggered. 
 * @type Array 
 */
var combineArr = [];

var clusteredIds = [];

function parseLink(portConnections, type) {
	var portConnectedLinks = [];
	
	if(type && type == 'has_port') {
		var device = portConnections;
		var parentDevice = device.parentDevice;
		var deviceId = parentDevice.id;
		//var deviceName = parentDevice.deviceName;
		var hasPorts = portConnections.hasPorts;
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
			    w: 2/*,
			    g: linkGlyph(item),
			    d: {
			      type: outgoingDevices[i].cost  //This can be used to calculate weighted shorted paths b/n nodes
			    }*/
			  };
		  portConnectedLinks.push(link);
		}
	} else {
		var sourcePort = portConnections.sourcePort;
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
			    t: 'connects_to',
			    a1: true,
			    a2: true,
			    c: 'rgb(55, 55, 255)',
			    w: 2/*,
			    g: linkGlyph(item),
			    d: {
			      type: outgoingDevices[i].cost  //This can be used to calculate weighted shorted paths b/n nodes
			    }*/
			  };
		  if(!arrayContains(combineArr, sourcePortId))
		  	combineArr.push(sourcePortId);
		  if(!arrayContains(combineArr, connectedPortId))
		  	combineArr.push(connectedPortId);
		  portConnectedLinks.push(link);
		}
	 }
	return portConnectedLinks;
}


function parseJson(data) {
	console.log("Parsing JSON");
	var json = data;
	
	var devices = json.devicesJsonBean;
	var ports = json.portsJsonBean;
	
	//console.log("Devices Size : "+devices.length+" : Ports Size : "+ports.length);
	//console.log("Devices : "+JSON.stringify(json.devicesJsonBean));
	//console.log("Ports : "+JSON.stringify(json.portsJsonBean));
	
	var items = [];
	
	for(var i = 0; i < devices.length; i++) {
		var device = devices[i];
		var hasPorts = device.hasPorts;
		console.log("Device Name : From Json : "+device.parentDevice.deviceName+" : Has Ports Length : "+hasPorts.length);
		
		items.push(parseDevice(device));
		
		for(var x = 0; x < hasPorts.length; x++) {
			items.push(parsePort(hasPorts[x]));
			
			var has_ports = parseLink(device, 'has_port');
			/**
			 * Have to iterate over "has_ports" array
			 * as keylines doesn't support addition
			 * of the complete array. It can only 
			 * recognize individual Nodes/Links.
			 */
			for(var h in has_ports) {				
				items.push(has_ports[h]);
			}
		}
	}

	for(var j = 0; j < ports.length; j++) {
		var portConnections = ports[j];
		
		var connections = parseLink(portConnections);
		   /**
			 * Have to iterate over "connections" array
			 * as keylines doesn't support addition
			 * of the complete array. It can only 
			 * recognize individual Nodes/Links.
			 */
		for(var i in connections)
			items.push(connections[i]);
	}
	
	return items || null;
}

function handleClickEvent(clickedID, x, y) {
	console.log("handling click event : "+clickedID);
	for(var i in combineArr)
		console.log("Element in combineArr : "+combineArr[i]);
		
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


/*************************************/
/* Calling Neo4j to get data */
/*************************************/ 


function callCypher(queryString, firstTime) {

  //$('#cypherquery').text(queryString);

  $.ajax({
    type: 'POST',
    url:'/cypher',   //this is the standard cypher end point which by default is at http://localhost:7474/db/data/cypher 
    data: JSON.stringify({query: queryString, params: {}}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (json) {

      var items = parseResult(json);

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
  'red': 'resources/images/red.png',
  //'device': 'resources/images/Axis_device_green.png'
  'device': 'resources/images/Axis_device_green_Old.png'
};

var labelDictionary = {
  'RATED'    : 'stars',
  'ACTS_IN'  : 'acts in',
  'DIRECTED' : 'directed'
};

function nodeIcon(type) {
  var icon = nodeIcons[type];
  icon = icon || '';  //in case the type isn't present
  return icon;
}

function linkGlyph(item) {
  if (item.type === 'RATED') {
    return [{c: 'rgb(50, 50, 10)', t: item.data.stars}];
  }
  return null; //other links do not have a glyph
}
