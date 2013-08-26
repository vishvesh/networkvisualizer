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
	
 <a href = "add">Add Device</a>
 <a href = "deleteAllDevices">Delete All Devices</a>
 <a href = "listAllDevices">Show Devices</a>
 <form action="findDeviceByName">
 	<label for="deviceName">Search for Device: <input type="text" name="deviceName" /></label>
 	<input type="submit" value="Search"/>
 </form>
 </body>
</html>