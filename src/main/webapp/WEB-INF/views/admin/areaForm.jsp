<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/common/taglibs.jsp"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<html>
<head>
<title>区域管理</title>
<script type="text/javascript" src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("#get").click(function() {
		get();
	});
	$("#add").click(function() {
		add();
	});
	$("#edit").click(function() {
		edit();
	});
	$("#del").click(function() {
		del();
	});
});
function get() {
	var url = '${ctx}/rest/area/';
	var query = $('#id').val() + '/' + $('#name').val();
	url += query;
	alert(url);
	$.get(url, function(data) {
		alert("id: " + data.id + "\nname: " + data.name);
	});
}
function add() {
	var mydata = '{"name":"' + $('#name').val() + '","id":"'
			+ $('#id').val() + '"}';
	alert(mydata);
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : '${ctx}/rest/area',
		processData : false,
		dataType : 'json',
		data : mydata,
		success : function(data) {
			alert("id: " + data.id + "\nname: " + data.name);
		},
		error : function() {
			alert('Err...');
		}
	});
}
function edit() {
	var mydata = '{"name":"' + $('#name').val() + '","id":"'
			+ $('#id').val() + '"}';
	alert(mydata);
	$.ajax({
		type : 'PUT',
		contentType : 'application/json',
		url : '${ctx}/rest/area/' + $('#id').val(),
		processData : false,
		dataType : 'json',
		data : mydata,
		success : function(data) {
			alert("id: " + data.id + "\nname: " + data.name);
		},
		error : function() {
			alert('Err...');
		}
	});
}
function del() {
	var mydata = '{"name":"' + $('#name').val() + '","id":"'
			+ $('#id').val() + '"}';
	alert(mydata);
	$.ajax({
		type : 'DELETE',
		contentType : 'application/json',
		url : '${ctx}/rest/area/' + $('#id').val(),
		processData : false,
		dataType : 'json',
		data : mydata,
		success : function(data) {
			alert("id: " + data.id + "\nname: " + data.name);
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
			<td><input type="button" id="get" value="Get" /></td>
			<td><input type="button" id="add" value="Add" /></td>
			<shiro:hasPermission name="user:edit">
			<td><input type="button" id="edit" value="Edit" /></td>
			</shiro:hasPermission>
			<shiro:hasPermission name="user:del">
			<td><input type="button" id="del" value="Delete" /></td>
			</shiro:hasPermission>
		</tr>
	</table>
</body>
</html>
