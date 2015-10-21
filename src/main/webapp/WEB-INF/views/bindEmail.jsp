<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<title></title>
<%@ include file="/WEB-INF/views/common/meta.jsp"%>


<script type="text/javascript"
	src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
    $("#emailMSG").hide();
    $("#phoneMSG").hide();
    $("#login").show();
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
						$("#code").after("<div id='msg'  style='color:blue;'>验证码输入正确</div>");
					}else{
						$("#code").after("<div id='msgError'  style='color:red;'>验证码输入错误</div>");
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
</head>

<body data-spy="scroll" data-target=".subnav" data-offset="50">
<div class="whiteframe" style="margin:auto; width:auto;height:auto;padding:24px;padding-top:40px;">
    <div class="panel panel-default" style="margin:auto; width:60%;height:auto;padding:24px;padding-top:0px;">
        <div class="panel-heading" style="background-color: #fff">
            <span class="glyphicon glyphicon-info-sign">由于您第一次登录,请绑定邮箱或电话</span>
        </div>
        <div class="panel-body">
            <div style="margin-left: 100px;margin-right: 100px">
	          <form:form id="auth-form" class="form-horizontal" name="form" role="form" action="${ctx}/bindEmail" method="post">
	          		<input type="hidden" name="loginname" value="${loginname}">
                   <div class="input-group">
                       <span class="input-group-addon">
                           <span class="glyphicon glyphicon-envelope"></span>
                       </span>
                       <input type="text" id="bindEmail" class="form-control" placeholder="请输入邮箱"  name="email" required="required" 
                        >
                   </div>
                   <div  style="margin-left:85px;color:red;height:20px;width:100px;"><span id="emailMSG">邮箱格式有误</span></div>
                   <div class="input-group">
                       <span class="input-group-addon">
                           <span class="glyphicon glyphicon-earphone"></span>
                       </span>
                       <input type="text" class="form-control" placeholder="请输入电话" id="bindPhone"  name="phone" required="required" >
                   </div>
                   <div  style="margin-left:85px;color:red;height:20px;width:100px;"><span id="phoneMSG">号码格式错误</span></div>
	               <div class="input-group" style="margin-left:85px;">
	                   		<input class="btn btn-primary"  accesskey="l" value="完成" tabindex="3" type="submit" />
	                   		
		           </div>
		           
			  </form:form >
            </div>
        </div>
    </div>
</div>

</body>
<script type="text/javascript">
$(function(){
    
   $("#bindEmail").blur(function(){
         var email=$(this).val();
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!reg.test(email)){
             $("#emailMSG").show();
        }else{
        	$("#emailMSG").hide();
        }
   })
   $("#bindPhone").blur(function(){
         var phone=$(this).val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!reg.test(phone)){
             $("#phoneMSG").show();
        }else{
        	$("#phoneMSG").hide();
        }
   })

  })
</script>
</html>