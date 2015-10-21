<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page
	import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ page import="org.apache.shiro.authc.ExcessiveAttemptsException"%>
<%@ page import="org.apache.shiro.authc.IncorrectCredentialsException"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<title>录播系统登录页面</title>
<META http-equiv="X-UA-Compatible" content="IE=10" >
<%@ include file="/WEB-INF/views/common/meta.jsp"%>


<script type="text/javascript"
	src="${ctx}/static/widgets/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript"
	src="${ctx}/static/widgets/bootstrap/2.3.2/js/bootstrap.min.js"></script>
<script src="${ctx}/front/assets/js/modernizr.js"></script>
<script src="${ctx}/front/assets/js/jquery.cookie.js"></script>
<script type="text/javascript">
	$(document).ready(function(){

    $("#login").show();
    
    
    //验证浏览器方法
    function check(r){  
    	var ua = navigator.userAgent.toLowerCase();  
  	  	return r.test(ua);  
  	}; 
    
    //验证浏览器版本
    function checkBrowserType(){
    	var browserName;  
  	  	var isOpera = check(/opera/);  
  	  	var isChrome = check(/chrome/);  
  	  	var isFirefox = check(/firefox/);  
  	  	var isWebKit = check(/webkit/);  
  	  	var isSafari = !isChrome && check(/safari/);  
  	  	var isIE = !isOpera && check(/msie/);  
  	  	var isIE7 = isIE && check(/msie 7/);  
  	  	var isIE8 = isIE && check(/msie 8/);  
  	  	if(isIE8) {  
  	  		browserName = "IE8";    
  	  	} else if(isIE7) {  
  	  		browserName = "IE7";  
  	  	} else if(isIE)  {  
  	  		browserName = "IE";  
  	} else if(isChrome) {  
   	  		browserName = "Chrome";  
  	} else if(isFirefox) {  
  		browserName = "Firefox";  
  	} else if(isOpera) {  
	  	browserName = "Opera";  
  	} else if(isWebKit) {  
  		browserName = "WebKit";  
  	} else if(isSafari)  {  
  		browserName = "Safari";  
  	} else  {  
	  	browserName = "Others";  
  	}  
  	  	return browserName;  
    };
    
    //提示信息显示
    if(checkBrowserType() != "Chrome"){
    	$("#infoSet").show();
  	} else {
  		$("#infoSet").hide();
  	}
  	
  	//关闭提示消息
  	$("#closeMsg").click(function(){
  		$("#infoSet").hide();
  	});
    
    
    $("#retrieved").hide();
    $("#hide").click(function(){
        $("#login").hide();
        $("#retrieved").show();
    });
    $("#show").click(function(){
        $("#login").show();
        $("#retrieved").hide();
    });

		//生成验证码
		$("#img").click(function(){
			$(this).attr("src",$(this).attr("src")+"?date="+new Date().getTime());
		});
		//校验验证码
		$("#code").blur(function(){
			$.ajax({
				url:'${ctx}/code/checkCode',
				type:"POST",
				data:{"code":$(this).val()},
				success:function(flag){
					$("div[id^='msg']").remove();
					if(flag){
						$("#code").after("<div id='msg' class='check-msg check-right-msg'><span class='glyphicon glyphicon-ok'></span></div>");
					}else{
						$("#code").after("<div id='msgError' class='check-msg check-error-msg'><span class='glyphicon glyphicon-remove'></span></div>");
					}				
				}
			});
		});
		//判断验证是否通过
		$(":submit").click(function(){
			if($("#msgError").length>0){
			return false;
			}
			return true;
		});
		//记住密码
		if ($.cookie("rmbuser") == "true") {
			$("#rmbuser").attr("checked", true);
			$("#loginname").val($.cookie("username"));
			$("#password").val($.cookie("password"));
		};
		//保存用户信息 
		$("#rmbuser").click(function() {
			if (document.getElementById("rmbuser").checked === true) {
			    var username = $("#loginname").val();
			    var password = $("#password").val(); 
				$.cookie("rmbuser", "true", {
					expires : 7
				}); // 存储一个带7天期限的 cookie 
				$.cookie("username", username, {
					expires : 7
				}); // 存储一个带7天期限的 cookie 
				$.cookie("password", password, {
					expires : 7
				}); // 存储一个带7天期限的 cookie 
			} else {
				$.cookie("rmbuser", "false", {
					expires : -1
				});
				$.cookie("username", '', {
					expires : -1
				});
				$.cookie("password", '', {
					expires : -1
				});
			}
		});	
	});
</script>

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
    <link rel="stylesheet" href="${ctx}/front/assets/css/zkicon.css" />
    
</head>

<body data-spy="scroll" data-target=".subnav" data-offset="50" style="overflow: hidden;">

<div class="header">
	<div id="infoSet" class="top-bar" style="background:#FFF9D5;">
	        <div class="index-top" style="margin:auto 0px;text-align:center;color:red;">
		               　<span >提示：如果页面无法正常显示或视屏无法播放，我们向您推荐安装 谷歌浏览器 <a href="${ctx}/front/assets/download/ChromeStandaloneSetup.1421221167.exe">离线下载</a>
	               <div style="position:absolute;top:0px;right:20px;color:black;cursor:pointer;float:right;" id="closeMsg">
		       				<i class="zkicon-fontsize-100 zk-logo icon-close"></i>
		       				不再提示
	     			</div>
	          </span>
	        </div>
	    </div>
</div>

<div class="panel panel-default">
    <div class="panel-body padding-0">
        <div style="background-color:transparent; margin: 200px auto"></div>
        <div style="background-color: #0273b8; width:100%;height:200px;
                    box-shadow: 0 0 6px 1px rgba(0,0,0,0.3)">
            <div style="padding: 40px;margin-left: 16%">
            <%
            String  deskTopPictureurl= (String)request.getSession().getAttribute("DESKTOPPICTUREURL");
            String desktopName = (String)request.getSession().getAttribute("DESKTOPNAME");
            if(deskTopPictureurl == null){
             %>
             <img src="${ctx}/front/assets/img/zjklogo.png">
             <span style="color: #fff;font-size: 22px">张家口市职教中心云录播平台</span>
             <%
							}else{
						%>
						 <img src="${ctx}<%=deskTopPictureurl %>">
						 <span style="color: #fff;font-size: 22px"><%=desktopName %></span>
						   <%
							}
						%>
            </div>
        </div>
        <div style="background-color:transparent; margin: 200px auto"></div>
    </div>
    <div class="login_bottom">
    	<div class="alert" style="color: #cecece;float:left;" role="alert">Copyright&copy;2014 现代中庆 www.zonekey.com.cn 版权所有 服务热线：400 898 9001</div>
    	<div  class="load-link"><a href="front/otherTools/Android-setup/zonekey_disrec_androidV1.0.zip"><i class="icon-android" style=""></i><p>Android版</p></a><a href="front/otherTools/Iphone-setup/zonekey_disrec_iphoneV1.0.zip
    	"><i class="icon-iphone"></i><p>Iphone版</p></a><a href="front/otherTools/Ipad-setup/zonekey_disrec_ipadV1.0.zip
    	"><i class="icon-ipad"></i><p>Ipad版</p></a><a href="front/otherTools/disrec-help/zonekey_disrec_help_1.0.zip"><i class="icon-reader"></i><p>使用手册</p></a></div>
    </div>
    
</div>


<div style="padding-left: 60%;margin-top: -568px" id="login">
<div class="panel panel-default" style="width: 290px; height: 320px;padding-left: 8px;
     box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.3)">
    <div class="panel-body" style="margin: 0px auto">
        <form:form id="auth-form" action="${ctx}/login" method="post" >
        	
						

        <div class="form-group input-group" style="margin-bottom: 0">
            <span class="input-group-btn">
                <span><h4 style="font-weight: 700">用户登录</h4></span>
            </span>
        </div>
        <div style="height:20px">
        	<%
							String error = (String) request
										.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
								if (error != null) {
						%>
						<span class="control-group error" style="color:red;font-size:11px"><%=error %></span>
						<%
							}
						%>
        </div>
		
        <div class="form-group input-group">

            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" id="loginname" name="loginname"  class="form-control" placeholder="请输入用户名">
        </div>

        <div class="form-group input-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
            </span>
            <input type="password" id="password" name="password"   class="form-control" placeholder="请输入密码">
        </div>
        <c:if test="${count>2}">
        <div class="form-group input-group">
            <div class="row">
                <div class="col-xs-7 padding-right-none">                 
					<input type="text" id="code" name="code" class="form-control width-115" placeholder="请输入验证码">  
                </div>
                <div class="col-xs-5 text-right">
                    <!--  <input type="text" class="form-control" placeholder="1234">-->
                    <img id="img" alt="验证码" src="${ctx}/code/getCode">
                </div>
            </div>
        </div>
        </c:if>
        <div class="form-group input-group fontSize-11">
            <span><input type="checkbox" id="rmbuser" style="vertical-align:middle;margin-top:-1px;margin-right:5px">记住密码</span>
            <%--<span class="pull-right"><a href="${ctx}/code/retrievedPwd">忘记密码？</span>--%>
            <span class="pull-right"><div class="btn-link" id="hide">忘记密码？</div></span>
        </div>
        <div class="form-group input-group">
            <%--<div style="width: 100%" class="btn btn-primary">--%>
             <input class="btn btn-primary" name="submit" accesskey="l"
                    style="width: 100%"
							value="登录" tabindex="3" type="submit" />
            <%--</div>--%>
            
        </div>
       </form:form>
    </div>
</div>
</div>

	<div style="padding-left: 60%;margin-top: -568px" id="retrieved">
		<div class="panel panel-default" style="width: 280px; height: 320px;padding-left: 24px;box-shadow: 13px 16px 37px -6px rgba(0,0,0,0.3)">
		<div class="panel-body" style="margin: 0px auto">
					<form:form id="auth-form" class="form-horizontal" role="form" action="${ctx}/code/sendMail" method="post">
			      		<div class="panel-body padding-left-none">
			      			<h4 style="font-weight:700">密码找回</h4>
				            <div>
				                <span>${msg }</span>
				            </div>
	        			</div>
						<div class="form-group input-group">
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-user"></span>
							</span>
							<input type="text" name="loginname" class="form-control" required="required" placeholder="请输入用户名">
						</div>
						
						
						<div class="form-group input-group">
							<div id="show" class="btn btn-link pull-right">
								返回登录
							</div>
						</div>
						<div class="form-group input-group">
							<input class="btn btn-primary"  accesskey="l" style="width: 100%"value="下一步" tabindex="3" type="submit" />
						</div>
						</form:form>
		</div>
		</div>
	</div>


</body>
</html>