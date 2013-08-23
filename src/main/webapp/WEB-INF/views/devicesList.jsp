<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!doctype>
<html>
<body style="text-align: center;">
	<h1>Devices:</h1>
	
 	<c:if test="${!empty devices}">
		<c:forEach items="${devices}" var="device">
			<li>${device.deviceName}</li>
			<br />
		</c:forEach>
	</c:if>
 <a href = "add">Add Device</a>
 </body>
</html>