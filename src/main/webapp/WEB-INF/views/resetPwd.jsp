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

    <script type="text/javascript"
			src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript"
		src="${ctx}/static/widgets/bootstrap/2.3.2/js/bootstrap.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		//生成验证码
		$("#repassword").blur(function(){
			check($(this));
		});
		//判断验证是否通过
		$(":submit").click(function(){
			return check($("#repassword"));
		});
		function check(obj){
			var repwd = obj.val();
			var pwd = $("#password").val();
			$("#msg").remove();
			if(repwd != pwd){
				obj.after("<div id='msg'  style='color:blue;'>两次输入的密码不一样</div>");
				return false;
			}
			return true;
		};
	});
	</script>
    <!-- endbuild -->
</head>
<body>
<!--[if lte IE 9]>
<div>不支持此浏览器</div>
<![endif]-->
<div class="whiteframe" style="margin:auto; width:auto;height:100%;padding:24px;padding-top:40px;">
    <div class="panel panel-default" style="margin:auto; width:60%;height:auto;padding-left:24px;padding-top:0px;padding-left:24px;">
        <div class="panel-heading" style="background-color: #fff">
            <span class="glyphicon glyphicon-info-sign"></span>
            重置密码
        </div>
        <div class="panel-body">
            <div style="margin-left: 100px;margin-right: 100px">
				<form:form id="auth-form" action="${ctx}/code/modifyPwd" method="post" >
					<div class="form-group" style="height:35px;">
	                   <label class="col-sm-3 text-right padding-left-right-none margin-top-5 control-label">用户名：</label>
	                   <div class="col-sm-9">
	                      <input type="text" id="loginname" name="loginname" readonly="readonly" value="${loginname}" placeholder="${loginname}" class="form-control">
	                   </div>
					</div>
				    <div class="form-group" style="height:35px;">
	                   <label class="col-sm-3 text-right padding-left-right-none margin-top-5 control-label" for="pwd">新密码：</label>
	                   <div class="col-sm-9">
	                       <input type="password" id="password" required="required" name="password"   class="form-control" placeholder="请输入新密码">
	                   </div>
	               </div>
				   <div class="form-group" style="height:35px;">
	                   <label class="col-sm-3 text-right padding-left-right-none margin-top-5 control-label" for="pwd" style="white-space: nowrap;">确认新密码：</label>
	                   <div class="col-sm-9">
	                       <input type="password" id="repassword"  name="repassword"   class="form-control" placeholder="请输入确认密码">
	                   </div>
	               </div>
				   <div class="form-group input-group">
				     	 <input class="btn btn-primary"  accesskey="l" style="width: 100%"value="下一步" tabindex="3" type="submit" />
				     	</button>
				 	</div>
				</form:form>
            </div>
        </div>
    </div>
</div>
</body>