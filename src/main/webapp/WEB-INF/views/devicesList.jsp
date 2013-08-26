<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype>
<html>
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
	 <form action="connectDevices">
	 	<label for="startNode">1st Device: <input type="text" name="startNode" /></label>
	 	<label for="endNode">2nd Device: <input type="text" name="endNode" /></label>
	 	<input type="submit" value="Connect Devices"/>
	 </form>
 </fieldset>
 
 </body>
</html>


