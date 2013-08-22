<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
	<h1>Devices:</h1>
	
 	<c:if test="${!empty devices}">
		<c:forEach items="${devices}" var="device">
			<li>${device.deviceName}</li>
			<br />
		</c:forEach>
	</c:if>
 
 </body>
</html>