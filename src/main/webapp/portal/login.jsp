<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt'%>

<%@ page
	import="org.springframework.security.ui.AbstractProcessingFilter"%>
<%@ page
	import="org.springframework.security.ui.webapp.AuthenticationProcessingFilter"%>
<%@ page import="org.springframework.security.AuthenticationException"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<link rel="stylesheet" type="text/css" media="screen"
		href="<c:url value='/style/index.css'/>" />
	<link rel="stylesheet" type="text/css" media="screen"
		href="<c:url value='/style/layout_index.css'/>" />
	<link rel="stylesheet" href="<c:url value='/style/home.css'/>"
		type="text/css" media="all" />
	<link rel="stylesheet" href="<c:url value='/style/jasig.css'/>"
		type="text/css" media="all" />
	<link rel="stylesheet" href="assets/css/bootstrap.3.1.1.css" />
    <link rel="stylesheet" href="assets/css/main.css" />
    <link rel="stylesheet" href="assets/css/form.css" />
    <link rel="stylesheet" href="assets/css/login.css" />
    <link rel="stylesheet" href="assets/css/icons.css" />

	<link rel="stylesheet"  href="assets/css/animate.css" />
    <link rel="stylesheet"  href="assets/css/ng-animate.css" />
    <script src="assets/js/lib/modernizr-2.6.2.min.js"></script>

<%
		String userCode = (String) session.getAttribute("userCode");
		String pwd = (String) session.getAttribute("pwd");
		System.out.println("j_username:-----"+userCode);
		System.out.println("password:-----"+pwd);
%>
</head>
<body   onload="init();">
	
	<div class="login-wrapper">
		<div class="login-window">
			<div class="header" style="margin:0px;text-align:center;">华泰再保系统</div>
			<div style="margin:20px;"></div>
			<form name="fm" action="<c:url value='j_spring_security_check'/>"
				method="post" onsubmit="return submitForm();">
				
	            <div>
	                <span class="glyphicon user"></span>
	                <input name="j_username" value="010108" maxlength="10" tabindex="1" id="userId" class="form-control" placeholder="用户名" ng-required="true" autofocus="true" />
	            </div>
	            <div>
	                <span class="glyphicon key"></span>
	                <input name="j_password" value="0000" tabindex="2" id="loginPassword" type="password" class="form-control" placeholder="密码" ng-required="true" />
	                <input type="hidden" name="lt" value="${flowExecutionKey}" /> 
	                <input type="hidden" name="_eventId" value="submit" />
	            </div>
	            
	            <div>
		            <button type="submit" name="loginBtn" value="登录" class="btn btn-primary btn-lg btn-block">登录</button>
		            <c:if test="${not empty param.login_error}">
						<tr>
							<td align="left" valign="middle"><font color="red"> <%
							AuthenticationException ex = (AuthenticationException) request.getSession().getAttribute(
				 				AbstractProcessingFilter.SPRING_SECURITY_LAST_EXCEPTION_KEY);
				 %> 登录失败，错误原因：<%=ex.getLocalizedMessage()%></font></td> 
						</tr>
					</c:if>
		        </div>
			</form>
		</div>
	</div>
</body>
<script language="javascript">	
//	if (self!=top){
//    top.location=self.location;
//  }
function submitForm(){
  return true;
}
function init(){
  <%
     if(userCode!=null &&  !userCode.equals("") && pwd!=null && !pwd.equals("")){
     
  %>
	    fm.j_username=<%=userCode%>;
		fm.j_password=<%=pwd%>;
		fm.submit();
  <%
    }else{
  %>
 		 fm.j_username.focus();
	   	 fm.j_username.select();
		 
	<%
		}
	%>
	
}
  
</script>
</html>