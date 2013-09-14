<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
<h1>Add Device:</h1>

	<form action="addDevice" method="POST" id="login-form">
	  <div class="form-row">
	    <label for="id_first_name" class="fieldNames">
	    Device Name : </label> <input type="text" name="deviceName"/>
	  </div>
	  <div class="form-row">
	    <label>&nbsp;</label><input type="submit" value="Add Device" />
	  </div>
	</form>
	
<br />	
<h1>Add Port:</h1>

	<form action="addPort" method="POST">
	<div class="form-row">
	    <label for="id_first_name" class="fieldNames">
	    Device Name : </label> <input type="text" name="deviceName"/>
	  </div>
	  <div class="form-row">
	    <label for="id_first_name" class="fieldNames">
	    Port Name : </label> <input type="text" name="portName"/>
	  </div>
	  <div class="form-row">
	    <label>&nbsp;</label><input type="submit" value="Add Port" />
	  </div>
	</form>	

</body>
</html>