<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/views/common/meta.jsp"%>
<title>Person</title>
<script type="text/javascript"
	src="${ctx}/static/widgets/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$("#profile").click(function() {
			profile();
		});
		$("#importOnClick").click(function() {
			importOnClick();
		});
	});
	//废掉   
	function profile() {
		var url = '${ctx}/json/person/profile/';
		var query = $('#id').val() + '/' + $('#name').val() + '/'
				+ $('#status').val();
		url += query;
		alert(url);
		$.get(url, function(data) {
			alert("id: " + data.id + "\nname: " + data.name + "\nstatus: "
					+ data.status);
		});
	}
	//废掉 
	function importOnClick() {
		var fileName = $("#file").val();
		if("" == fileName){
			alert("请选择需要上传的文件!");
			return;
		}

		if (fileName.indexOf('.xls') > 0 || fileName.indexOf('.xlsx') > 0 ){
			//$("#form1").get(0).submit(); 
		} else {
			alert("只能上传Excel文件!");
	    }
		 var mydata = '{"termid":"' + $('#termid').val() + '","live":"'
				+ $('#live').val() + '","livemodel":"' + $('#livemodel').val() + '"}';
		alert(mydata);
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : '${ctx}/person/export',
		
			dataType : 'json',
			data : mydata,
			success : function(data) {
				alert("termid: " + data.termid + "\nlive: " + data.live + "\nlivemodel: "
						+ data.livemodel);
			},
			error : function() {
				alert('Err...');
			}
		}); 
	}
	
	function check(){
		var  termid =$('#termid').val();
		alert(termid);
	}
</script>
</head>

<body>
	<table>
		<div id="custprdUpLoad" style="display: none" title="导入数据">
			<form id="form1" action="${ctx}/rest/curriculum/curriculum/import" method="post" onsubmit="return check()"
				enctype="multipart/form-data">
				<input type="hidden" name="returnURL" value="/curriculum.jsp" />
				<table class="table_edit">
					<tr>
						<td width="20%">选择模板文件</td>
						<td width="30%"><input id="file" type="file" name="file"
							class="input" /></td>
					</tr>
					<tr>
						<td>选择学期</td>
						<td><input id="termid" name="termid" value="1" /></td>
					</tr>
					<tr>
						<td>直播</td>
						<td><input id="live" name="live" value="1" /></td>
					</tr>
					<tr>
						<td>直播模式</td>
						<td><input id="livemodel" name="livemodel" value="1" /></td>
					</tr>
					<tr>
						<td>录像</td>
						<td><input id="record" name="record" value="1" /></td>
					</tr>
					<tr>
						<td>录像模式</td>
						<td><input id="video" name="video" value="1" /></td>
					</tr>
					<tr>
						<td>课间录像</td>
						<td><input id="classniddlerecord" name="classniddlerecord" value="1" /></td>
					</tr>
					<tr>
						<td>互动课程</td>
						<td><input id="intercourse" name="intercourse" value="1" /></td>
					</tr>
				</table>
				<div class="table_footer" style="text-align: left">
				<!--  <input type="button" id="importOnClick" value="importOnClick">导入</input>
				 <input type="button" id="closeUpdDialog" value="closeUpdDialog">关闭</input>  -->
					 <input type="submit" value="添加"/>   
				</div>
			</form>
		</div>
		
	</table>
</body>
</html>
