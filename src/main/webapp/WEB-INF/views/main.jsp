<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>现代中庆后台管理平台</title>
    <%@ include file="/WEB-INF/views/common/meta.jsp" %>
	<%@ include file="/WEB-INF/views/common/easyui-include.jsp" %>
	<script>
		function addTab(title, url){
			if (url){
		    	var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	    	} else {
		    	var content = '正在开发中...';
	    	}
			$('#uiTab').tabs('add',{
				title:title,
				content:content,
				closable:true
			});
		}
	</script>
	<style>
		.westmenu{
			text-align:center;
			background:#fff;
			height:80px;
		}
		.westmenu img{
			border:0;
		}
	</style>
</head>
<body class="easyui-layout">
	<div region="north" style="background:#fafafa;color:#2d5593;height:40px;">
	    <div style="font-size:16px;font-weight:bold;width:400px;padding:10px 0 0 10px;display:inline;">现代中庆后台管理平台</div>&nbsp;&nbsp;&nbsp;&nbsp;
	    <!--div align="right" style="display:inline">Welcome Admin&nbsp;&nbsp;<a href="login">登录</a></div-->
	    <div align="right" style="display:inline"><a href="${ctx}/logout">退出登录</a></div>
	</div>
	<div region="west" split="true" title="导航菜单" style="width:280px;padding1:1px;overflow:hidden;">
		<div class="easyui-accordion" fit="true" border="false">
			<div title="基础管理">
				<table style="width:100%;">
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('设备管理','${ctx}/member')">
								<img src="${ctx}/static/images/kontact.png"></img><br/>
								<span>设备管理</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('设备控制','${ctx}/person')">
								<img src="${ctx}/static/images/package_settings.png"></img><br/>
								<span>设备控制</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('课表管理','${ctx}/task')">
								<img src="${ctx}/static/images/kdmconfig.png"></img><br/>
								<span>课表管理</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('班级管理','${ctx}/user')">
								<img src="${ctx}/static/images/kdmconfig.png"></img><br/>
								<span>班级管理</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('报表管理','${ctx}/reportData')">
								<img src="${ctx}/static/images/kontact.png"></img><br/>
								<span>报表管理</span>
							</a>
						</td>
					</tr>
				</table>
			</div>
			<div title="系统管理">
				<table style="width:100%;">
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('统一认证','')">
								<img src="${ctx}/static/images/kdmconfig.png"></img><br/>
								<span>统一认证</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('权限管理','')">
								<img src="${ctx}/static/images/package_settings.png"></img><br/>
								<span>权限管理</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('日志管理','')">
								<img src="${ctx}/static/images/kdmconfig.png"></img><br/>
								<span>日志管理</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('消息服务','')">
								<img src="${ctx}/static/images/kontact.png"></img><br/>
								<span>消息服务</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('运行监控','')">
								<img src="${ctx}/static/images/kdmconfig.png"></img><br/>
								<span>运行监控</span>
							</a>
						</td>
					</tr>
					<tr>
						<td class="westmenu">
							<a href="javascript:addTab('远程维护','')">
								<img src="${ctx}/static/images/kontact.png"></img><br/>
								<span>远程维护</span>
							</a>
						</td>
					</tr>
				</table>
			</div>
		</div>	
	</div>
	<div region="center" fit="true" style="overflow:hidden;">
		<div id="uiTab" class="easyui-tabs" fit="true" border="false">
			<div title="首页" style="padding:20px;overflow:hidden;"> 
				<img src="${ctx}/static/images/logo.gif" alt="Artron" id="logo-image" />
				<div style="margin-top:20px;">
					<p></p>
					<p>&nbsp;</p>
					<p></p>
				</div>
			</div>
		</div>
	</div>
	<div region="south" style="height:40px;padding:10px;background:#efefef;">
	    <div style="background:#efefef;"><p align="center">Copy Right 2014-2018</p></div>
	</div>
</body>
</html>