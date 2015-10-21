<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/taglibs.jsp" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<html>
<head>
<title>任务管理</title>
<%@ include file="/WEB-INF/views/common/meta.jsp" %>
<%@ include file="/WEB-INF/views/common/easyui-include.jsp" %>
	
<script>
var page_url = '${ctx}/user/data';
var save_url  = '${ctx}/user/create';
var del_url  = '${ctx}/user/delete';
var get_url  = '${ctx}/user/load/';

//easyUI分页列表
$(function(){
	$('#queryDiv').panel({  
	  width:fixWidth(0.75),  
	  title: '任务查询' 
	});
	$('#pageList').datagrid({
		title:'任务管理', //标题
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
		pageList:[5,10,20,50],
		pageSize:10,
		idField:'id',
		pagination:true,//分页属性
		queryParams: {}, //查询条件
		width:fixWidth(0.75),
		columns:[[
		    {field:'ck',checkbox:true,width:2}, //复选框
		    {field:'id',title:'ID',width:10,sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			},
		    {field:'loginName',title:'登录名称',width:10,sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			},
			{field:'realName',title:'真实名称',width:10,sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			},
			{field:'email',title:'电子邮件',width:10,sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			},
			{field:'userType',title:'用户类型',width:10,sortable:true,
				sorter:function(a,b){
					return (a>b?1:-1);
				}
			}
		]], //要展示的数据结束		
		//以下是工具条 
		//工具条 
		toolbar:[
         {		        	  
            text:'增加',
            iconCls:'icon-add',
            handler:function(){
		      //打开窗口
              adduser();
            }
         },'-',
         {
             text:'修改',
             iconCls:'icon-edit',
             handler:function(){
               var objs = $('#pageList').datagrid('getSelected');
               var length = $('#pageList').datagrid('getSelections').length;
               
               if (objs == null || objs == '') {
                 $.messager.alert('提示消息', '请选择要修改的数据!', 'info');
               } 
               else if(length>1){
                 $.messager.alert('提示消息', '请选择一条数据进行修改!', 'info');
               }
               else {
                 var sid = objs.id;
                 getuser(sid);
               }
             }   
         },'-',
         {
             text:'删除',
             iconCls:'icon-cut',
             handler:function(){
                var objs = $('#pageList').datagrid('getSelections');
                if (objs == null || objs == '') {
                    $.messager.alert('提示消息', '请选择要删除的数据!', 'info');
                } else if(length>1){
                    $.messager.alert('提示消息', '请选择一条数据进行修改!', 'info');
                } else {
                	 $.messager.confirm('确认','确定要删除所选数据吗?',function(flag){
                	   var ids="";
                       if(flag){
	                     $.each(objs,function(i,n){
                           ids = ids + "," + n.id;
                         });
                         deluser(ids);
                       }
                    });  
                }
             }      
         },'-',
         {
            text:'刷新',
            iconCls:'icon-reload',
            handler:function(){
            	load();
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

function fixWidth(percent){
	return document.body.clientWidth * percent ;
}

//刷新方法：刷新分页列表
function load(){
	$('#pageList').datagrid('reload');
}
 
//查询
function searchList(){
	var queryParams = $('#pageList').datagrid('options').queryParams;
	//查询条件放到queryParams中：格式filter_params
	var opTimeSel = $('input:radio[name="opTimeSel"]:checked').val();
	if(opTimeSel=='inDay'){
		queryParams.filter_dateType = $('#filter_dateType').val();
		queryParams.filter_startTime = '';
		queryParams.filter_endTime = '';
    }
	if(opTimeSel=='inTime'){
		var startTime = $('#filter_startTime').datebox('getValue');
		var endTime = $('#filter_endTime').datebox('getValue');
		queryParams.filter_startTime = startTime;
		queryParams.filter_endTime = endTime;
		queryParams.filter_dateType = '';
    }
	$('#pageList').datagrid("reload");
}
     	
//清空查询条件   
function clearForm(){
	$('#pageList'). datagrid('clearSelections');  
	$('#queryForm')[0].reset();  
}

//新增窗口
function adduser(){
	$('#userWin').window('open');
}

//修改窗口
function getuser(id){
	//$('#inputForm').form('load',get_url+'?id='+id);
	$('#inputForm').form('load', get_url + id);
	$('#userWin').window('open');
}

//保存方法
function saveuser(){
	$('#inputForm').form('submit', {
	    url:save_url,
	    onSubmit:function(){
	    	return $(this).form('validate');
	    },
	    success:function(data){
			/**$.messager.alert('提交结果',data, 'info',function(){
	        	load();
	        	$('#userWin').window('close');
	        	$('#inputForm').form('clear');
	        	$('#title').removeAttr('readonly');
	        });**/
	        $.messager.alert('提交结果','保存成功!', 'info',function(){
		    	load();
		    	$('#userWin').window('close');
		    	$('#inputForm').form('clear');
	        });
	    	
	    }
	});
}

//删除方法
function deluser(ids){
	$.ajax({
	  url: del_url,
	  type: 'POST',
	  cache: false,
	  data: 'ids=' + ids,
	  success: function(data){
	    $.messager.alert('删除结果', data, 'info');
	    load();
	    $('#inputForm').form('clear');
	  }
	});
}

function goBack(){
	$('#pageList'). datagrid('clearSelections');
	$('#inputForm')[0].reset();
	$('#id').remove();
	$('#roleWin').window('close');
}
</script>
</head>
<body>
    <!-- 查询条件 -->
    <div id="queryDiv" class="easyui-panel" title="查询条件" collapsible="true" style="padding:5px;">
	    <form id="queryForm" name="queryForm">
	    <div class="demo-info" style="margin-bottom:10px">
		    <input type="radio" name="opTimeSel" value="inDay"/>
		    <select id="filter_dateType">
	    	<option value="day">当天</option>
	    	<option value="week">本周</option>
	    	<option value="month">本月</option>
	    	<option value="year">本年</option>
	    	</select><br/>
	    	<input type="radio" name="opTimeSel" value="inTime"/>
	    	操作时间：<input type="text" class="easyui-datebox" id="filter_startTime" name="filter_startTime" size="20"/>
			至<input type="text" class="easyui-datebox" id="filter_endTime" name="filter_endTime" size="20"/>
		    <a href="javascript:void(0)" onclick="searchList();" class="easyui-linkbutton" iconCls="icon-search">查询</a>
		    <a href="javascript:void(0)" onclick="clearForm();" class="easyui-linkbutton" iconCls="icon-cancel">清空</a>
		</div>
		</form>
	</div>
	
	<!-- 分页列表 -->
    <table id="pageList"></table>
    
    <!-- 增加修改表格 -->
	<div id="userWin" class="easyui-window" title="用户管理" style="padding: 5px; width: 600px; height: 400;"
	 iconCls="icon-search" closed="true" maximizable="false" minimizable="false" collapsible="false">
	  <form:form id="inputForm" modelAttribute="user" action="${ctx}/user/save" method="post">
	    <input type="hidden" name="id" value="${user.id}"/>
		<table class="datagrid-body">
		  <tr><td>登录名称</td>
		  <td><input class="easyui-validatebox" type="text" 
					id="loginName" name="loginName" value="${user.loginName}" 
					size="65" required="true"/>
		  </td></tr>
		  <tr><td>真实名称</td>
		  <td><input class="easyui-validatebox" type="text" 
					id="realName" name="realName" value="${user.realName}" 
					size="65" required="true"/>
		  </td></tr>
		  <tr><td>电子邮件</td>
		  <td><input class="easyui-validatebox" type="text" 
					id="email" name="email" value="${user.email}" 
					size="65" required="true"/>
		  </td></tr>
		  <tr><td>用户类型</td>
		  <td><input class="easyui-validatebox" type="text" 
					id="userType" name="userType" value="${user.userType}" 
					size="65" required="true"/>
		  </td></tr>
		  <tr>
			  <td colspan="2">
			      <a href="javascript:void(0)" onclick="saveuser();" class="easyui-linkbutton" iconCls="icon-save">提交</a>
		          <a href="javascript:void(0)" onclick="goBack();" class="easyui-linkbutton" iconCls="icon-back">返回</a>
			  </td>
		  </tr>
		</table>
	</form:form>
</div>
</body>
</html>