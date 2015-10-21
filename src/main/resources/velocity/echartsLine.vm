<div id="echarts${id}" style="height:350px;width:1550px;border:0px solid #ccc;padding:2px;"></div>
<script type="text/javascript">

 $(function () {
  require(
        [
            'echarts',
            'echarts/chart/line'
        ],
        function (ec) {
				 var myChart = ec.init(document.getElementById('echarts${id}'));
				 myChart.setOption({
					    title : {
					        text: '${functitle}',
					        x:"center"
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:${legend},
					        y:340,
					        selectedMode:false
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    xAxis : [
					        {
					            type : 'category',
					            axisLine : false,
					            splitLine :false,
					            data : ${xData}
					        }
					    ],
					    yAxis : [
					        {   
					        	name : "值",	
					            type : 'value',
					            axisLabel : {
					                formatter: function(a){
					                	return (a/1000)+"k";
					                }
					            },
					            min :-20000
					        }
					    ],
					    grid :{
					    	borderWidth:0,
					    	height :250,
					    	width : 1300
					    },
					    series : ${data}
				 });

				})        
 });
    
</script>