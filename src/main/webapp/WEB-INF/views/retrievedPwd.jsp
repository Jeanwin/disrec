<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page
	import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<!--[if lt IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gte IE 8]><!-->
<html class="no-js" id="ng-app" ng-controller="MainCtrl">
<!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta http-equiv="pragma" content="no-cache" />
	<title>{{config.app.name}} | {{config.app.version}}</title>
	<link rel="stylesheet" href="${ctx}/front/assets/css/bootstrap.3.1.1.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/bootstrap-lemon.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/main.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/form.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/nav.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/icons.css" />
	<link rel="stylesheet" href="${ctx}/front/assets/css/animate.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/angular-ui-tree.min.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/fullcalendar.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/ng-animate.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/angular-toggle-switch-bootstrap.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/angular-toggle-switch.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/angular-file-upload.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/angular-growl.min.css">
	<link rel="stylesheet" href="${ctx}/front/assets/css/slick.css">
	<script type="text/javascript" src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
</head>
<body>
	<div class="whiteframe" style="margin:auto; width:auto;height:100%;padding:24px;padding-top:40px;">
		<div class="panel panel-default"
			style="margin:auto; width:60%;height:auto;padding:24px;padding-top:0px;">
			<div class="panel-heading" style="background-color: #fff">
				<span class="glyphicon glyphicon-info-sign"></span> 请输入您需要找回登录密码的用户名
			</div>
			<div class="panel-body">
				<div style="margin-left: 100px;margin-right: 100px">
					<form:form id="auth-form" action="${ctx}/code/sendMail" method="post">
		      		<div class="panel-body">
			            <div>
			                <span>${msg }</span>
			            </div>
        			</div>
		        		<div class="input-group">
							<span class="input-group-addon"> 
								<span class="glyphicon glyphicon-user"></span>
							</span> 
							<input type="text" name="loginname" class="form-control" required="required" placeholder="请输入用户名">
						</div>
						<br>
						<div class="input-group">
							<div class="btn btn-primary" type="submit">
								下一步
							</div>
						</div>
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>