define(['app','config'], function (app,config) {
    app.registerController('videoDotCtrl', ['$scope','$modal','TreeService',function($scope,$modal,TreeService) {
		
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
        //TEST
    	//初始化节点信息
        var searchDotInfo = function(keywords){
            TreeService.dotInfo(keywords).then(
                function(data){
                    $scope.dotInfos = data;
                    console.log($scope.dotInfos);
                },
                function(){

                }
            );
        };

		 //取消编辑视频打点信息
       // $scope.cancelEdit = function(index){
       //       $scope.editModalInput = $scope.dotInfos[index].description;

       // }
       //确定编辑视频打点信息
       $scope.okEdit = function(index,editModalInput){
             $scope.dotInfos[index].description = editModalInput;
       }
       //删除节点
       $scope.deleteDot = function(index){
         $scope.dotInfos.splice(index,1);
         console.log($scope.dotInfos);
       }

       //添加节点信息
       $scope.addDotInfo = function(){
		   var t = $scope.addDotTime;
		   if(/[\d][\d]+:[\d][\d]:[\d][\d]/.test(t)){
			   var a = t.split(":");
			   t = parseInt(a[0])*3600+parseInt(a[1])*60+parseInt(a[2]);
			   if(videoCO.in().v_times[videoCO.in().v_times.length-1]<t){
				return;   
			   }
		   }else{
			 alert("请输入正确的时间格式！\n(01:23:45)");
			 return;
		   }
		   var ar = insertData($scope.dotInfos,{dotTime:t,description:$scope.addDotTitle},'dotTime')
       		if(ar){	
       			$scope.dotInfos = ar;
       		}else{
				console.log("时间节点重复，插入失败");
			}
       }


       //插入数据
       var insertData = function(ar,obj,id){
			if(ar.length>1){
				if(obj[id]==ar[ar.length-1][id]||ar[0][id]==obj[id]){return false;}
				if(obj[id]<ar[ar.length-1][id]&&ar[0][id]<obj[id]){
					var s=0,e=ar.length-1,i=obj[id],m=0;
					while(e-s>1){
						if(i==ar[e][id]||i==ar[s][id]){return false;}
						m=Math.floor((e+s)/2);
						if(i>ar[m][id]){
							s=m;
						}else{
							e=m;
						}
					}
					if(ar[s][id]==i||i==ar[e][id]){return false;}
					return (ar.slice(0,s+1)).concat(obj,ar.slice(e));
					
				}else{
					if(ar[0][id]<obj[id]){
						ar.push(obj)	
					}else{
						ar.unshift(obj);
					}
				}
			}else if(ar.length==0){
				ar.push(obj);	
			}else{
				if(obj[id]>ar[0][id]){
					ar.push(obj)
				}else{
					ar.unshift(obj);
				}
			}
			return ar;
		}


		var init = function(){
		 	$scope.editModal ="通过记录生活，记录文化，记录历史，来实现自己继承文化的梦想。";
            $scope.editModalInput = $scope.editModal;
            searchDotInfo();
			var videolist = ["http://192.168.12.167/3.mp4","http://192.168.12.167/VGA.mp4"];
			new videoCO().init(videolist);
			videoCO.in().callback = function(t){$scope.addDotTime = $scope.getLocalTime(t)}
		 };
		 init();
      }]);
});
