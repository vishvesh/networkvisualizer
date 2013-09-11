
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

function parseJson(data) {
	console.log("Parsing JSON");
	var json = data;
	console.log(JSON.stringify(json[0]));

	  //items are visual chart items
	  var items = [];
	
	  for (var i = 0; i < json.length; i++) {
	    var item = json[i];
	    
        items.push(parseNode(item));
        
        var links = parseLink(item);
        for(var j = 0; j < links.length; j++)
        	items.push(links[j]);
	  }
	  
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
	//chart.combo().combine({ids:["31", "35"]}, {animate: true}, function (comboIds) {
	/*var link = {
	    type: 'link',
	    id1: 34,
	    id2: 41,
	    id: '341-414',
	    //t: labelDictionary[item.type],
	    t: 'Value: 43\nCost: 64',
	    a2: true,
	    c: 'rgb(55, 55, 255)',
	    w: 2//,
	    //g: linkGlyph(item),
	    //d: {
	    //  type: outgoingDevices[i].cost  //This can be used to calculate weighted shorted paths b/n nodes
	   // }
	  };
	  
	chart.expand(link, {fit: true, animate: true, tidy: true});
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
	}, 3000);
	
	setTimeout(function() {
		console.log("UnCombine called before");
		
		chart.combo().uncombine(chart.selection(), {animate: true, full: true});
		
		console.log("UnCombine called after");
	}, 6000);
	
	//chart.combo().combine({ids:["28-32","32-39"]}, {animate: true}, function (comboIds) {
	  // you can record the combos here if you like
		//console.log("INSIDEEEE");
	//});
	
	if((clickedID && parseInt(clickedID))) {
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
	
	calculateShortestPaths(28, 41);

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


function parseResult(json) {

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
}

function validNode(item) {
  return item.data.name || item.data.title;
}

function validConnection(arr) {
  return validNode(arr[0]) && validNode(arr[2]);
}

var idPrefix = 'neo:';

function parseNode(item) {

  //var basetype = getSubStringAfterLastIndexOfChar(item.data.__type__, '.').toLowerCase();
  //var icontype = (basetype === 'actor' && item.data.gender === 'female') ? 'actor-female' : basetype;

	var parentDevice = item.parentDevice;
	
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
  var node = {
    id: parentDevice.id,
    type: 'node',
    t: parentDevice.deviceName,
    u: nodeIcon('device')
    //w: w,
    //h: h
    //t: nodeLabel(basetype, item),
    //u: nodeIcon(icontype)/*,
    /*d: {
      type: basetype  //store the type of the item for later - will be used for subsequent queries
    }*/
  };

  return node;

}

function parseLink(item) {

  //var id1 = idPrefix + cleanURL(item.start);
  //var id2 = idPrefix + cleanURL(item.end);
	var links = [];
	var parentDevice = item.parentDevice;
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
	  
	  /*var link2 = {
	    type: 'link',
	    id1: id1,
	    id2: id2,
	    id: id1 + '1-1' + id2,
	    //t: labelDictionary[item.type],
	    t: 'Value: '+outgoingDevices[i].value+'\nCost:'+outgoingDevices[i].cost,
	    a2: true,
	    c: 'rgb(133,28,63,0.5)',
	    w: 8,
	    g: linkGlyph(item),
	    d: {
	      type: outgoingDevices[i].cost  //This can be used to calculate weighted shorted paths b/n nodes
	    }
	  };*/
	  
	  links.push(link);
	  //links.push(link2);
	}

  return links;

}

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

function linkGlyph(item) {
  if (item.type === 'RATED') {
    return [{c: 'rgb(50, 50, 10)', t: item.data.stars}];
  }
  return null; //other links do not have a glyph
}

//a couple of helper methods

function cleanURL(url){
  return url.substring(url.lastIndexOf('/')+1);
}

function getSubStringAfterLastIndexOfChar(str, char) {
  return str.substring(str.lastIndexOf(char)+1);
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