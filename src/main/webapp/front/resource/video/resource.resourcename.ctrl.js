define(['app','displayVideos'], function (app) {
    app.registerController('ResourceNameCtrl', ['$scope','$sce','$stateParams','$modal' ,'ResourceService','$timeout'
                                                , function ($scope,$sce,$stateParams,$modal,ResourceService,$timeout) {
    	//获取点播信息
    	$scope.getDemond = function(floder){
    		ResourceService.demand(floder).then(
                    function(data){
/*                      $.each(data.data,function(i,video){
//                    	 video.vod_url = $sce.trustAsResourceUrl(video.vod_url);
						 video.vod_url = $sce.trustAsResourceUrl(video.resourcePath+video.file_name);
                    	 if(i==data.data.length-1){
                    		 $scope.mainVideo = video;
                    	 }
                      });
                       data.data.splice(data.data.length-1,1);
                       $scope.data = data.data;*/
					   var dataAr=[]
					   console.log(data)
					   for(var str in data){
						   dataAr.push($sce.trustAsResourceUrl(data[str]))
						}
						$scope.mainVideo_url = dataAr[0];
						dataAr.shift();
                        $scope.data = dataAr;
                       
                    },
                    function(){
                    	
                    }
                );
    	}
    	
    	//切换视频
    	$scope.toggleVideo = function(index){
			$scope.VideoControls.changeMainVideo(index+1);
			setVideoHeight();
/*    		temp = $scope.mainVideo;
    		$scope.mainVideo = $scope.data[index];
    		$scope.data[index] = temp;*/
    	}
    	
    	
    	
    	window.onresize = function () {
    		setVideoHeight();
                                      
        }
        var setVideoHeight = function(){ 
            	var rightVideo =  $("#videoListDom .vedio-image");
                var leftVideoHeight = 0;
        		$.each(rightVideo,function(i,video){
        			leftVideoHeight = video.clientHeight + leftVideoHeight;
                })     
                $("#myvideo").css('height',function(){
                    return leftVideoHeight;
                });
            };
       
        var init = function(){
        	$scope.video =  JSON.parse($stateParams.floder);
        	$scope.floder = $scope.video.floder;
            $scope.getDemond($scope.floder);
//            $scope.mainVideo = $scope.data[0].vol_url;
			$timeout(function(){
            	var ar=[];
            	var videoListDomSet = document.getElementById("videoListDom");
				if(videoListDomSet){
            	ar[0] = document.getElementById("myvideo");
            	for(var i=0;i<videoListDomSet.childNodes.length;i++){
            		if(videoListDomSet.childNodes[i].childNodes.length>1){
            			ar.push(videoListDomSet.childNodes[i].childNodes[1]);
            		}
            	}
//				console.log(ar);
				$scope.VideoControls = new displayVideos(ar);
				}
            },1000);
			 $timeout(function(){
				 setVideoHeight();
			 },2000);
			
        };
        init();
    }]);
});
