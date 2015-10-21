<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ECharts</title>
    <%@ include file="/WEB-INF/views/common/meta.jsp" %>
	<%@ include file="/WEB-INF/views/common/easyui-include.jsp" %>
	<script src="${ctx}/static/widgets/echarts/esl.js"></script>
	<script>
		$(function(){
			 require.config({
		        paths:{ 
		            echarts:'${ctx}/static/widgets/echarts/echarts',
		            'echarts/chart/map' : '${ctx}/static/widgets/echarts/echarts-map'
		        }
			 	
		     });
		});
		
	</script>
</head>
<body class="easyui-layout">
	<div region="center" fit="true" style="overflow:hidden;">
		<div id="uiTab" class="easyui-tabs" fit="false" border="true">
			<c:forEach var="item" items="${htmls}" varStatus="status">
			<div title="${item.key }" style="padding:20px;overflow:hidden;">
			${item.value } 
			</div>
			</c:forEach>
		</div>
		<c:forEach var="outitem" items="${out}">
	        <script>var $out$ = true;</script>
	        ${outitem.value}
	    </c:forEach>
	</div>	
</body>
</html>