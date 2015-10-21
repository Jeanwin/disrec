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
    <meta content ="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>{{config.app.name}} | {{config.app.version}}</title>
    <!-- build:css ${ctx}/front/assets/css/lemon.min.css -->
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

    <!-- endbuild -->
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="${ctx}/front/assets/css/normalize.css">
    <![endif]-->
    <!-- build:js ${ctx}/front/assets/js/lemon.min.js -->
    <script src="${ctx}/front/assets/js/modernizr.js"></script>
    <script src="PolyfillLoader.js"></script>
    <!-- endbuild -->
</head>
<body>
<!--[if lte IE 9]>
<div>不支持此浏览器</div>
<![endif]-->
<div class="whiteframe" style="margin:auto; width:auto;height:100%;padding:24px;padding-top:40px;">
    <div class="panel panel-default" style="margin:auto; width:90%;height:auto;padding:24px;padding-top:0px;">

        <div class="panel-body">
            <div>
                <span>${msg }</span>
            </div>
        </div>
    </div>
</div>
</body>