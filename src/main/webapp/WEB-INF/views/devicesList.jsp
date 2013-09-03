<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype>
<html>
<head>

<script type="text/javascript" src="resources/js/jquery/jquery-1.10.1.min.js"></script>

<style type="text/css">
	canvas {
		border: 1px solid black;
	}
</style>

</head>
<body style="text-align: center;">
	<h1>Devices:</h1>
	
	<c:choose>
	  <c:when test="${!empty devices}">
	    <c:forEach items="${devices}" var="device">
			<li>${device.deviceName}</li>
			<br />
		</c:forEach>
	  </c:when>
	  <c:otherwise>
	    <li>No Devices Found</li>
	  </c:otherwise>
	</c:choose>

	 <li><a href="add">Add Device</a></li>
	 <li><a href="deleteAllDevices">Delete All Devices</a></li>
	 <li><a href="listAllDevices">Show All Devices</a></li>
 
 <fieldset>
	 <form action="findDeviceByName">
	 	<label for="deviceName">Search for Device: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Search"/>
	 </form>
 </fieldset>
 
 <fieldset>
	 <form action="deleteDevice">
	 	<label for="deviceName">Delete Device: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Delete"/>
	 </form>
 </fieldset>
 
 <fieldset>
	 <form action="connectDevices">
	 	<label for="startNode">1st Device: <input type="text" name="startNode" /></label>
	 	<label for="endNode">2nd Device: <input type="text" name="endNode" /></label>
	 	<input type="submit" value="Connect Devices"/>
	 </form>
 </fieldset>
 
 <fieldset>
	 <form action="getAllChildConnectedDevices">
	 	<label for="deviceName">Device Name: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Show all Relationships"/>
	 </form>
 </fieldset>
 
 <!--canvas id="canvas" width="400" height="400"></canvas-->
 <!--script type="text/javascript">
console.log($('#canvas'));
 
 var canvas = $('#canvas');
 var context = document.getElementById('canvas').getContext('2d');
	var offset = canvas.offset();
	
	context.lineWidth = 1;
	context.strokeStyle = "navy";
	context.font = 'italic 24px san-serif';
	context.textBaseline = 'middle';
	context.strokeText('Neo4j - Canvas Test!', 10, 20);
	
	context.beginPath();
	context.moveTo(40, 40);
	context.lineTo(100, 50);
	context.stroke();
 </script-->
 </body>
</html>


