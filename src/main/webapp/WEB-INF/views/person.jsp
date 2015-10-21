<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <%@ include file="/WEB-INF/views/common/meta.jsp" %>
	<title>Person</title>
	<script type="text/javascript" src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		$("#profile").click(function() {
			profile();
		});
		$("#login").click(function() {
			login();
		});
	});
	function profile() {
		var url = '${ctx}/json/person/profile/';
		var query = $('#id').val() + '/' + $('#name').val() + '/'
				+ $('#status').val();
		url += query;
		alert(url);
		$.get(url, function(data) {
			alert("id: " + data.id + "\nname: " + data.name + "\nstatus: "
					+ data.status);
		});
	}
	function login() {
		var mydata = '{"name":"' + $('#name').val() + '","id":"'
				+ $('#id').val() + '","status":"' + $('#status').val() + '"}';
		alert(mydata);
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : '${ctx}/person/login',
			processData : false,
			dataType : 'json',
			data : mydata,
			success : function(data) {
				alert("id: " + data.id + "\nname: " + data.name + "\nstatus: "
						+ data.status);
			},
			error : function() {
				alert('Err...');
			}
		});
	}
	</script>
  </head>
  
  <body>
    	<table>
		<tr>
			<td>id</td>
			<td><input id="id" value="100" /></td>
		</tr>
		<tr>
			<td>name</td>
			<td><input id="name" value="snowolf" /></td>
		</tr>
		<tr>
			<td>status</td>
			<td><input id="status" value="true" /></td>
		</tr>
		<tr>
			<td><input type="button" id="profile" value="Profile" /></td>
			<td><input type="button" id="login" value="Login" /></td>
		</tr>
	</table>
  </body>
</html>
