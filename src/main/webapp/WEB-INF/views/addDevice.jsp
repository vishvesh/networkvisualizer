<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
<h1>Add Device:</h1>

	<form action="addDevice" method="POST" id="login-form">
	  <div class="form-row">
	    <label for="id_first_name" class="fieldNames">
	    Device Name : </label> <input type="text" name="deviceName" id="deviceName" />
	  </div>
	  <div class="form-row">
	    <label>&nbsp;</label><input type="submit" value="Add Device" />
	  </div>
	</form>

</body>
</html>