<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/common/taglibs.jsp"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<title>任务管理</title>
<%@ include file="/WEB-INF/views/common/meta.jsp"%>
<%@ include file="/WEB-INF/views/common/easyui-include.jsp"%>

<script type="text/javascript">
$('#tt').tabs({ 
	border:false, 
	onSelect:function(title){ 
	alert(title+' is selected'); 
	} 
}); 
$('#tt').tabs('add',{ 
	title:'New Tab', 
	content:'Tab Body', 
	closable:true 
}); 
var pp = $('#tt').tabs('getSelected'); 
var tab = pp.panel('options').tab;
</script>
</head>

<body>
	<div id="tt" class="easyui-tabs" style="width:500px;height:250px;">
		<div title="Tab1" style="padding:20px;display:none;">tab1</div>
		<div title="Tab2" closable="true"
			style="overflow:auto;padding:20px;display:none;">tab2</div>
		<div title="Tab3" iconCls="icon-reload" closable="true"
			style="padding:20px;display:none;">tab3</div>
	</div>
</body>
</html>
