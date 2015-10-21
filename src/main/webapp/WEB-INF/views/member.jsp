<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/common/taglibs.jsp"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>账号管理</title>
<%@ include file="/WEB-INF/views/common/meta.jsp"%>
<%@ include file="/WEB-INF/views/common/easyui-include.jsp" %>
<!--script src="${ctx}/static/js/account.js" type="text/javascript"></script-->
<script src="${ctx}/static/widgets/jquery-validation/1.9.0/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctx}/static/widgets/jquery-validation/1.9.0/messages_cn.js" type="text/javascript"></script>
<link href="${ctx}/static/widgets/jquery-validation/1.9.0/validate.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/css/demo.css"  type="text/css" rel="stylesheet">
 <script type="text/javascript">
 function jumpPage(pageNo) {
		$("#pageNo").val(pageNo);
		$("#mainForm").submit();
	}
	function search() {
		$("#order").val("");
		$("#orderBy").val("");
		$("#pageNo").val("1");
		$("#mainForm").action="admin.action";
		$("#mainForm").submit();
	}
		 var page_urls = '${ctx}/member/data';
	     var start_urls  = '${ctx}/memberinfo/start';
	     var stop_urls  = '${ctx}/memberinfo/stop';
	     var resetPwds = '${ctx}/memberinfo/resetPassword'
	//easyUI分页列表
	$(function(){
		$('#pageList').datagrid({
			title:'账号管理', //标题
			url  :page_urls,
			loadMsg:'数据载入中，请稍后……',
			nowrap: false,
			striped: true,
			collapsible:true,				
			fitColumns: true,
			pagination:true,
			singleSelect:true,
			rownumbers:true,
			remoteSort: false,
			pageList:[5,10,20,50],
			pageSize:5,
			width:fixWidth(0.75),
			idField:'memberId',
			pagination:true,//分页属性
			queryParams:{}, //查询条件
			columns:[[
			    {field:'ck',checkbox:true,width:2}, //复选框
			    
			    /**以下为要展示的数据
			       field:对象属性
                   title:要显示的中文标题
			    **/
			    {field:'memberName',title:'登录名称',width:10,sortable:true,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'realName',title:'真实名称',width:10,sortable:true,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'loginTime',title:'上次上线时间',width:10,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'status',title:'状态',width:10,
					formatter:function(value,row){
						return getStatus(row.status);
						},
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				}
			]], //要展示的数据结束
			
			//以下是工具条 
			toolbar:[					
	        
	          {
	              text:'启用',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status = 1;
	                 var objs = $('#pageList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择要启用的数据！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要启用该用户吗?',function(flag){ 
                             var ids="";
                           
	                         if(flag){
		                         $.each(objs,function(i,n){ 
		                             ids=n.memberId;
		                         });
		                         starts(ids,status);
                             }
	                     });  
                     }
                  }      
	          }
	          ,'-', 
	          {
	              text:'停用',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status=2;
	                 var objs = $('#pageList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择要停用的数据！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要停用该用户吗?',function(flag){ 
                             var ids="";
	                         if(flag){
		                         $.each(objs,function(i,n){   
		                             ids=n.memberId;
		                         });
		                         stops(ids,status);
                             }
	                     });  
                     }
                  }      
	          },'-', 
	          {
	              text:'重置密码',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status=2;
	                 var objs = $('#pageList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择用户！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要重置密码吗?',function(flag){ 
                             var ids="";
	                         if(flag){
		                         $.each(objs,function(i,n){   
		                        	 ids=n.memberId;
		                         });
		                         resetpwd(ids);
                             }
	                     });  
                     }
                  }      
	          }
	          ,'-', 
	           {
	              text:'刷新',
	              iconCls:'icon-reload',
	              handler:function(){
	            	  loading();
	             }
	          }
	        ],
	         onLoadSuccess:function(){   
             	$('#pageList').datagrid('clearSelections'); 
             },
             onDblClickRow:function()//双击如果复选框选中则取消
             {
                 var objs = $('#pageList').datagrid('getSelected');
                  if (objs != null || objs != '') {
                 	 $('#pageList').datagrid('clearSelections'); 
                  }
             }
	    });
	});
	
function getStatus(status){
	if(status == '1'){
		return '启用中';
	}
	if(status == '2'){
		return '已停用';
	}
}
	
//刷新方法：刷新分页列表
function loading(){
	$('#pageList').datagrid('reload');
}

  //用户--启用
 function starts(ids,status){
    $.ajax({
	  url: start_url,
	  type: 'post',
	  cache: false,
	  data: 'memberId='+ids,
	  success: function(data){
		  var ms = data.message;
        $.messager.alert('启用结果',ms);
        loading();
        $('#inputForm').form('clear');
	  },
	  dataType:'json'
    });
 }

 //用户--停用
 function stops(ids,status){
    $.ajax({
	  url: stop_url,
	  type: 'post',
	  cache: false,
	  data: 'memberId='+ids,
	  success: function(data){
		var ms = data.message;
        $.messager.alert('停用结果',ms);
        loading();
        $('#inputForm').form('clear');
	  },
	  dataType:'json'
    });
 }
//重置密码方法
 function resetpwd(ids){
 	$.ajax( {
 		url : resetPwd,
 		type : 'post',
 		data : 'memberId=' + ids,
 		success : function(data) {
 			var mes = data.message;
 			$.messager.alert('重置密码结果',mes);
 			loading();
 	        $('#inputForm').form('clear');
 		},
 		  dataType:'json'

 	});
 }
 
//查询
function searchList(){
	 $('#inputForm').form('clear');
    	var queryParams = $('#pageList').datagrid('options').queryParams;	
    	//查询条件放到queryParams中：格式filter_params       
        queryParams.orgId = $('#orgId').val(); 
       // queryParams.memberFlag = '3';
        addCookie("sms",$('#orgId').val());
        $('#pageList').datagrid("reload");
   	}
   	
//清空查询条件   
function clearForm(){   
  	$('#pageList'). datagrid('clearSelections');  
    $('#queryForm')[0].reset();  
} 
function searchTeList(){
	var queryParams = $('#pageList').datagrid('options').queryParams;	
	var a = $('#orgId').val();
	if(null!=a&&a!=''){
	
	//查询条件放到queryParams中：格式filter_params  
	queryParams.orgId = $('#orgId').val();
    queryParams.memberName = $('#tename').val(); 
   // queryParams.memberFlag = '3';
    $('#pageList').datagrid("reload");
	}else{
		$.messager.alert('Message','请先选择机构再进行查询');
	}
	}
//查询单个用户

function double(){
	searchList();
	searchPopList();
}


</script>
<!-- 普通用户 -->
 <script type="text/javascript">
 function jumpPage(pageNo) {
		$("#pageNo").val(pageNo);
		$("#mainForm").submit();
	}
	function search() {
		$("#order").val("");
		$("#orderBy").val("");
		$("#pageNo").val("1");
		$("#mainForm").action="admin.action";
		$("#mainForm").submit();
	}
		 var page_url = '${ctx}/memberinfo/datas';
	     var start_url  = '${ctx}/memberinfo/start';
	     var stop_url  = '${ctx}/memberinfo/stop';
	     var resetPwd = '${ctx}/memberinfo/resetPassword'
	//easyUI分页列表
	$(function(){
		$('#pagesList').datagrid({
			title:'普通账号管理', //标题
			url  :page_url,
			loadMsg:'数据载入中，请稍后……',
			nowrap: false,
			striped: true,
			collapsible:true,				
			fitColumns: true,
			pagination:true,
			singleSelect:true,
			rownumbers:true,
			remoteSort: false,
			pagesList:[5,10,20,50],
			pageSize:5,
			width:fixWidth(0.75),
			idField:'memberId',
			pagination:true,//分页属性
			queryParams:{}, //查询条件
			columns:[[
			    {field:'ck',checkbox:true,width:2}, //复选框
			    
			    /**以下为要展示的数据
			       field:对象属性
                   title:要显示的中文标题
			    **/
			    {field:'memberName',title:'登录名称',width:10,sortable:true,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'realName',title:'真实名称',width:10,sortable:true,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'loginTime',title:'当前状态(上次上线)',width:20,
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				},
				{field:'status',title:'状态',width:20,
					formatter:function(value,row){
						return getStatus(row.status);
						},
					sorter:function(a,b){
						return (a>b?1:-1);
					}
				}
			]], //要展示的数据结束
			
			//以下是工具条 
			toolbar:[					
	        
	          {
	              text:'启用',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status = 1;
	                 var objs = $('#pagesList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择要启用的数据！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要启用该用户吗?',function(flag){ 
                             var ids="";
                           
	                         if(flag){
		                         $.each(objs,function(i,n){ 
		                             ids=n.memberId;
		                         });
		                         start(ids,status);
                             }
	                     });  
                     }
                  }      
	          }
	          ,'-', 
	          {
	              text:'停用',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status=2;
	                 var objs = $('#pagesList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择要停用的数据！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要停用该用户吗?',function(flag){ 
                             var ids="";
	                         if(flag){
		                         $.each(objs,function(i,n){   
		                             ids=n.memberId;
		                         });
		                         stop(ids,status);
                             }
	                     });  
                     }
                  }      
	          },'-', 
	          {
	              text:'重置密码',
	              iconCls:'icon-add',
	              handler:function(){
	            	  var status=2;
	                 var objs = $('#pagesList').datagrid('getSelections');
	                 if (objs == null || objs == '') {
                         $.messager.alert('提示消息', '请选择用户！', 'info');
                     } else {
                     	 $.messager.confirm('确认','确定要重置密码吗?',function(flag){ 
                             var ids="";
	                         if(flag){
		                         $.each(objs,function(i,n){   
		                             ids=n.memberId;
		                         });
		                         ad(ids,status);
                             }
	                     });  
                     }
                  }      
	          }
	          ,'-', 
	           {
	              text:'刷新',
	              iconCls:'icon-reload',
	              handler:function(){
	                  load();
	             }
	          }
	        ],
	         onLoadSuccess:function(){   
             	$('#pagesList').datagrid('clearSelections'); 
             },
             onDblClickRow:function()//双击如果复选框选中则取消
             {
                 var objs = $('#pagesList').datagrid('getSelected');
                  if (objs != null || objs != '') {
                 	 $('#pagesList').datagrid('clearSelections'); 
                  }
             }
	    });
	});
	
function getStatus(status){
	if(status == '1'){
		return '启用中';
	}
	if(status == '2'){
		return '已停用';
	}
}

function fixWidth(percent){
  	return document.body.clientWidth * percent ;
}

//刷新方法：刷新分页列表
function load(){
	$('#pagesList').datagrid('reload');
}

  //用户--启用
 function start(ids,status){
    $.ajax({
	  url: start_url,
	  type: 'post',
	  cache: false,
	  data: 'memberId='+ids,
	  success: function(data){
		  var ms = data.message;
        $.messager.alert('启用结果',ms);
		
	    load();
        $('#inputForm').form('clear');
	  },
	  dataType:'json'
    });
 }

 //用户--停用
 function stop(ids,status){
    $.ajax({
	  url: stop_url,
	  type: 'post',
	  cache: false,
	  data: 'memberId='+ids,
	  success: function(data){
		var ms = data.message;
        $.messager.alert('停用结果',ms);
	    load();
        $('#inputForm').form('clear');
	  },
	  dataType:'json'
    });
 }
//重置密码方法
 function ad(memid){
 	$.ajax( {
 		url : resetPwd,
 		type : 'post',
 		data : 'memberId=' + memid,
 		success : function(data) {
 			var mes = data.message;
 			$.messager.alert('重置密码结果',mes);
 			load();
 		},
 		  dataType:'json'

 	});
 }
 
//查询
function searchPopList(){					
    	var queryParams = $('#pagesList').datagrid('options').queryParams;	
    	//查询条件放到queryParams中：格式filter_params       
        queryParams.orgId = $('#orgId').val(); 
       // queryParams.memberFlag = '4';
        $('#pagesList').datagrid("reload");
        addCookie("sms",$('#orgId').val());
   	}
   	
//清空查询条件   
function clearForm(){   
  	$('#pagesList'). datagrid('clearSelections');  
    $('#queryForm')[0].reset();  
} 

//查询单个普通账号
function searchPopOne(){					
    	var queryParams = $('#pagesList').datagrid('options').queryParams;	
    	//查询条件放到queryParams中：格式filter_params
    	var a = $('#orgId').val();
    	if(null!=a&&a!=''){
		queryParams.orgId = $('#orgId').val();
        queryParams.memberName = $('#popname').val(); 
        //queryParams.memberFlag = '4';
        $('#pagesList').datagrid("reload");
    	}else{
    		$.messager.alert('Message','请先选择机构再进行查询');
    	}
    	
   	}

</script>
<script type="text/javascript">
function addCookie(objName,objValue){//添加cookie
	var str = objName + "=" + escape(objValue);
	var date = new Date();
	var ms = 60*60*20;
	date.setTime(date.getTime() + ms);
	str += "; path=/;";
	document.cookie = str;
	var s =document.cookie;
	//alert(s);
	}

	function getCookie(objName){//获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
	var temp = arrStr[i].split("=");
	if(temp[0] == objName) return unescape(temp[1]);
	}
	}
$(function(){
	var coo = getCookie("sms");
	$("#orgId option[value='"+coo+"']").attr("selected", true);
});
</script>
  </head>
  
  <body>
    <%--<div class="demo-info" style="margin-bottom:10px">  
        <div class="demo-tip icon-tip">&nbsp;</div>  
        <div>
        <select name="orgId" id="orgId" size="1" >
			<option value='' selected="selected">请选择</option>
				<c:forEach items="${it.OrganizationInfo}" var="se">
					<option value='${se.orgId}'>${se.orgName}</option>
				</c:forEach>
		</select>
		<a href="javascript:void(0)" id="text" name="text" class="easyui-linkbutton" onclick="double();">设置为当前机构</a>
        </div> 
    </div>
    <div class="demo-info" style="margin-bottom:10px">  
        <div class="demo-tip icon-tip">教师账号管理&nbsp;</div>  
        <div>
        	<input type="text" id="tename" name="tename" />
        	<a href="javascript:void(0)" id="text" name="text" class="easyui-linkbutton" onclick="searchTeList();">查找</a>
        </div> 
    </div>
	--%><table id="pageList"></table>

  </body>
</html>
