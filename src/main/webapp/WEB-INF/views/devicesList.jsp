<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
	<h1>People:</h1>
	
 	<c:if test="${!empty persons}">
		<c:forEach items="${persons}" var="person">
			<li>${person.firstName} : ${person.lastName}</li>
			<br />
		</c:forEach>
	</c:if>
 
 </body>
</html>