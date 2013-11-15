<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype>
<html>
<head>

<script type="text/javascript" src="resources/js/jquery/jquery-1.10.1.min.js"></script>
<link rel="stylesheet" href="resources/css/devicesList.css" />

</head>
<body style="text-align: center;">
	
	<div class="float-left">
	<h1>Devices:</h1>
		<c:choose>
		  <c:when test="${!empty devices}">
		    <c:forEach items="${devices}" var="device">
				<li>${device.deviceName}</li>
			</c:forEach>
		  </c:when>
		  <c:otherwise>
		    <li>No Devices Found</li>
		  </c:otherwise>
		</c:choose>
		</div>
		
	<div class="float-left">
	<h1>Ports:</h1>
		<c:choose>
		  <c:when test="${!empty ports}">
		    <c:forEach items="${ports}" var="port">
				<li>${port.portName}</li>
			</c:forEach>
		  </c:when>
		  <c:otherwise>
		    <li>No Ports Found</li>
		  </c:otherwise>
		</c:choose>
	</div>
	
	 <br />
	 <div class="center">
		 <li><a href="add">Add Device Or Port</a></li>
		 <li><a href="deleteAllDevices">Delete All Devices</a></li>
		 <li><a href="deleteAllPorts">Delete All Ports</a></li>
		 <li><a href="listAllDevicesAndPorts">Show All Devices & Ports</a></li>
		 <li><a href="visualize">Visualize Graph</a></li>
		 <li><a href="view">Visualize Graph with EXTJS</a></li>
	 </div>
 
 <fieldset>
	 <form action="findDeviceByName">
	 	<label for="deviceName">Search for Device: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Search"/>
	 </form>
 </fieldset>

 <fieldset>
	 <form action="deleteDevice">
	 	<label for="deviceName">Delete Device: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Delete Device"/>
	 </form>
 </fieldset>
 
 <fieldset>
	 <form action="deletePort">
	 	<label for="portName">Delete Port: <input type="text" name="portName" /></label>
	 	<input type="submit" value="Delete Port"/>
	 </form>
 </fieldset>
 
 <fieldset>
	 <form action="connectDevicesViaPorts" method="POST">
	 	<label for="startNode">1st Device: <input type="text" name="startNode" /></label>
	 	<label for="startPort">1st Port: <input type="text" name="startPort" /></label>
	 	<label for="endNode">2nd Device: <input type="text" name="endNode" /></label>
	 	<label for="endPort">2nd Port: <input type="text" name="endPort" /></label>
	 	<input type="submit" value="Connect Devices"/>
	 </form>
 </fieldset>
 
 <!--fieldset>
	 <form action="connectDeviceToPorts">
	 	<label for="startNode">1st Device: <input type="text" name="startNode" /></label>
	 	<label for="portName">1st Port: <input type="text" name="portName" /></label>
	 	<input type="submit" value="Connect Device To Ports"/>
	 </form>
 </fieldset-->
 
 <!-- fieldset>
	 <form action="getAllChildConnectedDevices">
	 	<label for="deviceName">Device Name: <input type="text" name="deviceName" /></label>
	 	<input type="submit" value="Show all Relationships"/>
	 </form>
 </fieldset-->
 
<%--  <canvas id="canvas" width="400" height="300"></canvas>
 <script type="text/javascript">
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
 </script> --%>
 </body>
</html>


