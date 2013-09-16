
var chart;

/*var expandQueries = {
  'actor':    'START clickedactor=node({id})\n' + 
              'MATCH clickedactor-[rel:ACTS_IN*]->movie\n' + 
              'RETURN clickedactor, rel, movie',
  'movie':    'START clickedmovie=node({id})\n' + 
              'MATCH person-[rel:ACTS_IN*]->clickedmovie\n' + 
              'RETURN clickedmovie, rel, person'
};

var ratingsQuery =  'START movie=node:Movie(id="603")\n' + 
                      'MATCH movie<-[rel:RATED*]-person\n' + 
                      'RETURN movie, rel, person';*/

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
						  900,  
						  afterChartCreated);
});

function afterChartCreated(err, loadedChart) {
  
  $('#standardlayout').click(applyStandardLayout);
  $('#hierarchylayout').click(applyHierarchyLayout);
  $('#radiallayout').click(applyRadialLayout);
  $('#structurallayout').click(applyStructuralLayout);
  $('#fullScreen').click(fullScreenMode);

  chart = loadedChart;
  chart.bind('dblclick', expandClickedData);
  chart.bind('click', handleClickEvent);
  chart.interactionOptions({handMode:true});
  
  var data = jsonData;
  console.log("data : "+data);
  
  var items = parseJson(data);
  for(item in items)
  console.log(items[item]);
  
  chart.load({type: 'LinkChart', items: items}, function() {
  	chart.zoom('fit', {}, applyStandardLayout);
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


function parseDevice(device) {

	var parentDevice = device.parentDevice;
	var deviceId = parentDevice.id;
	var deviceName = parentDevice.deviceName;
	
	var deviceNode = {
	    id: deviceId,
	    type: 'node',
	    t: deviceName,
	    u: nodeIcon('device'),
	    w: 200,
	    h: 100
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    /*d: {
	      type: basetype  //store the type of the item for later - will be used for subsequent queries
	    }*/
     };
  /*
  console.log(parentDevice.deviceName);
  //var outgoingDevices = item.outgoingDevices;
  var iconType;
  var w = 300;
  var h = 120;
  if(parentDevice.deviceName == 'Polaris') {
 	iconType = 'red';
 	w = 60;
 	h = 60;
  }
  else
  	iconType = 'device';
  	
  console.log("ICON TYPE : "+iconType);
  	
  var nodeIconType = nodeIcon(iconType);
	
  var node = {
    id: parentDevice.id,
    type: 'node',
    t: parentDevice.deviceName,
    u: nodeIconType,
    w: w,
    h: h
    //t: nodeLabel(basetype, item),
    //u: nodeIcon(icontype)/*,
    //d: {
    //  type: basetype  //store the type of the item for later - will be used for subsequent queries
    //}
  };*/
	
  return deviceNode;
}

function getSubStringAfterLastIndexOfChar(str, char) {
  return str.substring(str.lastIndexOf(char) + 1);
}

function parsePort(port) {
	//var hasPort = hasport;
	var portId = port.id;
	var portName = port.portName;
	var parsedPortName = getSubStringAfterLastIndexOfChar(portName, '-');
	console.log("Has Port : Port Name : "+portName+ " : Port ID : "+portId+ " : Parsed Port Name : "+parsedPortName);
	
	var portNode = {
	    id: portId,
	    type: 'node',
	    t: parsedPortName,
	    u: nodeIcon('device'),
	    w: 20,
	    h: 30
	    //t: nodeLabel(basetype, item),
	    //u: nodeIcon(icontype)/*,
	    /*d: {
	      type: basetype  //store the type of the item for later - will be used for subsequent queries
	    }*/
    };
    return portNode;
}

/**
 * Instead of extending the Array prototype,
 * it's good to create a separate function,
 * since we add extra property when we
 *  extend the Array's prototype.
 */
function arrayContains(array, item) {
	console.log("Inside Array Contains Custom Method : Array : "+array+" : Item : "+item);
	if(Array.indexOf) {
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


var combineArr = [];

function parseLink(portConnections, type) {
//function parseLink(item) {

  //var id1 = idPrefix + cleanURL(item.start);
  //var id2 = idPrefix + cleanURL(item.end);
	var portConnectedLinks = [];
	
	if(type && type == 'has_port') {
		var device = portConnections;
		var parentDevice = device.parentDevice;
		var deviceId = parentDevice.id;
		//var deviceName = parentDevice.deviceName;
		var hasPorts = portConnections.hasPorts;
		//console.log("INSIDE HAS PORTTTTTTTT");
		//console.log(device+" : "+parentDevice+ " : "+deviceId+ " : "+hasPorts);
		for(var i in hasPorts) {
			var hasPort = hasPorts[i];
			//console.log("deviceId : "+deviceId + " : hasPort.id : "+hasPort.id);
			var link = {
			    type: 'link',
			    id1: deviceId,
			    id2: hasPort.id,
			    id: deviceId + '-' + hasPort.id,
			    //t: labelDictionary[item.type],
			    t: 'has_port',
			    a2: true,
			    b1: 0,
			    b2: 0,
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
		//console.log("SHOULD COME IN ELSE PART!");
		var sourcePort = portConnections.sourcePort;
		var sourcePortId = sourcePort.id;
		var connectedPorts = portConnections.connectedPorts;
		//console.log("CONNECTED PORTS LENGTH ???? : "+connectedPorts.length);
		for(var i in connectedPorts) {
			var connectedPort = connectedPorts[i];
			var connectedPortId = connectedPort.id;
			//console.log("Source Port ID : "+sourcePortId + " : Connected Port ID : "+connectedPortId);
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
		 //console.log("LENGTHHHHHHHHHHHHHHHH : "+portConnectedLinks.length);
		 //console.log(link);
		}
	 }
	return portConnectedLinks;
	/*var parentDevice = item.parentDevice;
	var outgoingDevices = item.outgoingDevices;
	
	for(i in outgoingDevices) {
	  var id1 = parentDevice.id;
	  var id2 = outgoingDevices[i].id;
	
	  var link = {
	    type: 'link',
	    id1: id1,
	    id2: id2,
	    id: id1 + '-' + id2,
	    //t: labelDictionary[item.type],
	    t: 'Value: '+outgoingDevices[i].value+'\nCost:'+outgoingDevices[i].cost,
	    a2: true,
	    c: 'rgb(55, 55, 255)',
	    w: 2,
	    g: linkGlyph(item),
	    d: {
	      type: outgoingDevices[i].cost  //This can be used to calculate weighted shorted paths b/n nodes
	    }
	  };

	  links.push(link);
	}
  return portConnectedLinks;*/
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
	
	/*for(var i = 0; i < ports.length; i++) {
		var port = ports[i];
		console.log("Port Name : From Json : "+port.sourcePort.portName);
	}*/

	  //items are visual chart items
	  /*var items = [];
	
	  for (var i = 0; i < json.length; i++) {
	    var item = json[i];
	    
        items.push(parseNode(item));
        
        var links = parseLink(item);
        for(var j = 0; j < links.length; j++)
        	items.push(links[j]);
	  }*/
	  
	  /*for (var i = 0; i < json.length; i++) {
	    var item = json[i];
       	items.push(parseLink(item));
	  }*/

	return items || null;
}

function handleClickEvent(clickedID, x, y) {
	console.log("handling click event : "+clickedID);
	//var selectionContainsNodeCombo = chart.combo().isCombo(chart.selection([31,38]), {type: 'node'});
	//console.log(chart.getItem(clickedID)+" : Selection contains combo : "+selectionContainsNodeCombo);
	console.log(chart.getItem(clickedID));
	for(var i in combineArr)
		console.log(combineArr[i]);
	chart.combo().combine(
		{
			//ids: [5,8,11],
			ids: combineArr,
			label: 'Ports'
		},
		{
	    	animate: true
	    },
	    function(comboIds) {
  			console.log("INSIDEEEE : "+comboIds);
  	    }
	    //,
	    //style: comboStyle
	    );	

	/*chart.expand(link, {fit: true, animate: true, tidy: true});
	chart.animateProperties({id: link.id, c: 'rgba(133,28,63,0.5)', w: 10}, {time: 500});
	
	
	setTimeout(function() {
		console.log("Combine called before");
		
		chart.combo().combine({
		    ids: [34,41],
		    label: 'Group',
		    animate: false//,
		    //style: comboStyle
	  	});	
		//chart.combo().combine({ids:[34,41]}, {animate: true}, function (comboIds) {
	   //you can record the combos here if you like
		//console.log("INSIDEEEE : "+comboIds);
	   //});
		
		console.log("Combine called after");
	}, 3000);*/
	
	setTimeout(function() {
		console.log("UnCombine called before");
		
		chart.combo().uncombine(chart.selection(), {animate: true, full: true});
		
		console.log("UnCombine called after");
	}, 3000);
	
	//chart.combo().combine({ids:["28-32","32-39"]}, {animate: true}, function (comboIds) {
	  // you can record the combos here if you like
		//console.log("INSIDEEEE");
	//});
	
	/*if((clickedID && parseInt(clickedID))) {
		console.log("Clicked ID : Left Click : "+clickedID);
		var link2 = {
		    type: 'link',
		    id1: 37,
		    id2: 35,
		    id: 37 + '1-1' + 35,
		    //t: labelDictionary[item.type],
		    t: 'Value: 44\nCost: 54',
		    a2: true,
		    c: 'rgba(133,28,63,0.5)',
		    w: 5
		  };
		  
		//var theItems = parseJson(JSON.parse(sampleJson));
	  	chart.expand(link2, {fit: true, animate: true, tidy: true});
		chart.animateProperties({id: link2.id, c: 'rgba(133,28,63,0.5)', w: 10}, {time: 500});
    }*/
}

function expandClickedData(clickedID, x, y) {
	console.log("Clicked ID : Double Click : "+clickedID);
	
	calculateShortestPaths(5, 8);

  /*if (clickedID) {

    var cleanID = getSubStringAfterLastIndexOfChar(clickedID, ':');
    var clickedItem = chart.getItem(clickedID);
    var expandQuery = expandQueries[clickedItem.d.type].replace('{id}', cleanID);
    callCypher(expandQuery, false);

  }*/
}

function applyStandardLayout() {
  chart.layout('standard');
}

function applyHierarchyLayout() {
  chart.layout('hierarchy', {top:chart.selection()});
}

function applyRadialLayout() { 
  chart.layout('radial', {top:chart.selection()});
}

function applyStructuralLayout() {
  chart.layout('structural', {tightness: 2});
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


/***********************************************************************/
/* Parsing Cypher response format to KeyLines chart format            */
/***********************************************************************/


/*function parseResult(json) {

  var connections = json.data;

  //items are visual chart items
  var items = [];

  for (var i = 0; i < connections.length; i++) {
    var connection = connections[i];
    //connection is an array, 0 is a node, 1 is an array of links, 2 is the other node
    if (validConnection(connection)) {
      items.push(parseNode(connection[0]));
      items.push(parseNode(connection[2]));
      items.push(parseLink(connection[1][0]));
    }
  }

  return items;
}*/

function validNode(item) {
  return item.data.name || item.data.title;
}

function validConnection(arr) {
  return validNode(arr[0]) && validNode(arr[2]);
}

var idPrefix = 'neo:';

function calculateShortestPaths(id1, id2, opts) {
	var paths = chart.graph().shortestPaths(id1, id2, {direction: 'any'});
	console.log('Number of hops = ' + paths.distance);  
	
	chart.selection(paths.items);
	
	console.log("PATH ITEMS: "+paths.items);
	
	for(item in (paths.items).reverse()) {
		
		var theItem = paths.items[item];
		console.log("Item : "+theItem);
		
		if(theItem.indexOf('-') != -1)
			chart.animateProperties({id: theItem, c: 'rgba(133,28,63,0.5)', w: 10}, {time: 500});
	}
}


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
  'device': 'resources/images/Axis_device_green.png',
  'user': 'icon/custom/identity.png',
  'actor': 'icon/new/man.png',
  'actor-female':'icon/new/woman.png',
  'movie':'icon/new/movie3.png', 
  'director':'icon/custom/Profile.png'
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

/*function linkGlyph(item) {
  if (item.type === 'RATED') {
    return [{c: 'rgb(50, 50, 10)', t: item.data.stars}];
  }
  return null; //other links do not have a glyph
}*/

//a couple of helper methods

function cleanURL(url){
  return url.substring(url.lastIndexOf('/')+1);
}

/*var theChart = {
 type: 'LinkChart',          //this must be exactly this string
 items: [
   { id: 'node1',             //'node1' is the identity of the node
     t: 'Zeus',              //the label to be used under the icon
     type: 'node',            //the type of the item: must be 'node' for nodes
     u: '/icons/person.png',
     //u: 'resources/images/Axis_device_green.png',  //the url of the icon
     x: 300,                  //the x position (measured to the centre of the icon)
     y: 150,                   //the y position (measured to the centre of the icon)
     //w: 300,
     //h: 120,
     g: [
         {                          
         c: 'rgb(255, 0, 0)',         //the glyph fill colour
         p: 'ne',                     //glyph in NE corner. use 'se', 'sw', 'nw' for the other corners
         t: '!',                       //the glyph text
         a: true
         }
       ]
   },
   { id: 'node2',             //'node1' is the identity of the node
     t: 'Athena',              //the label to be used under the icon
     type: 'node',            //the type of the item: must be 'node' for nodes
     u: '/icons/person.png',
     //u: 'resources/images/Axis_device_green.png',  //the url of the icon
     x: 500,                  //the x position (measured to the centre of the icon)
     y: 500                   //the y position (measured to the centre of the icon)
     //w: 300,
     //h: 120
   },
   {
     c: 'rgb(0, 0, 255)',     //the colour of the link
     id: 'link1',             //'link1' is the identity of this link
     id1: 'node1',            //the identity of the node at one end
     id2: 'node2',            //the identity of the node at the other end
     t: 'is_connected_to',              //the label to be used for the link
     type: 'link',            //the type of the item: must be 'link' for links
     w: 1,                     //the width of the link in pixels
     g: [                             //an array of glyphs, shown left to right
         {
           c: 'rgb(255, 0, 0)',         //the glyph fill colour
           t: '!',                       //the glyph text
           a: true
         }
       ]
   }
 ]
};

$(window).load(function () {
	  //
	  //Set the rendering mode. 'auto' will use whatever is best for the platform. 
	  //Set to 'flash' or 'canvas' for fine-grained control. 
	  KeyLines.mode('canvas');
	  //
	  //Set the canvas asset path if using 'auto' or 'canvas'
	  KeyLines.setCanvasPaths('resources/js/keylines/assets/');
	  //
	  //If you are using 'auto' or 'flash' you will need to 
	  //set up the paths so that the KeyLines wrapper knows where to load the Flash component
	  // KeyLines.setFlashPaths('public/keylines.swf', 
	                         // 'vendor/swfobject.js', 
	                          //'vendor/expressInstall.swf');
	  //
	  //load the component: specify the id, size and callback
	  KeyLines.createChart('drawingID', //id
	                            818, //width
	                            586, //height
	                            callback); //callback
	 });
	 //
	 function callback(err, chart) {
	 	console.log(theChart.type);
	  chart.load({
	  	type: theChart.type,
	  	items: theChart.items
	  }//{
	    //type: 'LinkChart',
	    //items: [{id:'id1', type: 'node', x:150, y: 150, t:'Hello World!'}]
	  //}
	  );
	 }
	 
	 
	 
	 
	 
	 */