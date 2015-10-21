
define(['app','config'], function (app,config) {
    app.registerController('videoCutCtrl', ['$scope','$modal',function($scope,$modal) {
		
		//将时间戳换成时间
    	 $scope.getLocalTime = function(nS) {   	  
           var t = new Date(parseInt(nS) * 1000); 
           return (t.getHours()<18?'0':'')+(t.getHours()-8)+':'+(t.getMinutes()>9?t.getMinutes():'0'+t.getMinutes())+':'+(t.getSeconds()>9?t.getSeconds():'0'+t.getSeconds());
              
        }     
        
        //将时间换成时间戳
        $scope.transdate = function(endTime){
            var date=new Date();
            date.setFullYear(endTime.substring(0,4));
            date.setMonth(endTime.substring(5,7)-1);
            date.setDate(endTime.substring(8,10));
            date.setHours(endTime.substring(11,13));
            date.setMinutes(endTime.substring(14,16));
            date.setSeconds(endTime.substring(17,19));
            return Date.parse(date)/1000;
        }
		
       $scope.okEdit = function(index,editModalInput){
             $scope.dotInfos[index].description = editModalInput;
       }
	   $scope.showVideoTime = function(tstr,activeIndex){
		   $scope.videoTime = $scope.getLocalTime(tstr);
		   console.log($scope.getLocalTime(tstr),activeIndex)
	   }
       //删除节点
//       $scope.deleteDot = function(index){
//         $scope.dotInfos.splice(index,1);
//         console.log($scope.dotInfos);
//       }

       //添加节点信息
//       $scope.addDotInfo = function(){
//		   var t = $scope.addDotTime;
//		   if(/[\d][\d]+:[\d][\d]:[\d][\d]/.test(t)){
//			   var a = t.split(":");
//			   t = parseInt(a[0])*3600+parseInt(a[1])*60+parseInt(a[2]);
//			   if(videoCO.in().v_times[videoCO.in().v_times.length-1]<t){
//				return;   
//			   }
//		   }else{
//			 alert("请输入正确的时间格式！\n(01:23:45)");
//			 return;
//		   }
//		   var ar = insertData($scope.dotInfos,{dotTime:t,description:$scope.addDotTitle},'dotTime')
//       		if(ar){	
//       			$scope.dotInfos = ar;
//       		}else{
//				console.log("时间节点重复，插入失败");
//			}
//       }


		var init = function(){
			var videolist = ["http://192.168.12.167/3.mp4","http://192.168.12.167/VGA.mp4"];
			new videoCut().init(videolist);
			videoCut.in().callback =  $scope.showVideoTime;
		 };
		 init();
      }]);
});