define(['app'], function (app) {
    app.registerController('CmsMainCtrl', ['$scope', '$location',function ($scope, $location) {
            var init = function(){ 
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_mhcms_url_view') === -1){
            	alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('dashboard');
            };           	
            	//$scope.ifmDom = window.ifmDom = document.getElementById('cmsIfm');				
				if(document.cookie.indexOf('jeesite.session.id')!=-1){
					var cookie = document.cookie.slice(document.cookie.indexOf('jeesite.session.id'));
					if(cookie.indexOf(';')!=-1){						
						cookie = cookie.slice(0,cookie.indexOf(';')+1)
					}else{
						cookie+=';'	;
					}
					var index = location.href.indexOf('disrec/front/')+13
					if(index!=12){
						cookie+='?'+location.href.slice(0,index)+'cms/exec.html'
					}
					$scope.cmscookie = cookie;
					return;
					var w=document.getElementById('cmsIfm').contentWindow;
					w.document.cookie+=cookie;
					console.log('w.document.cookie',w.document.cookie)
					//console.log($scope.ifmDom.document)
				}

            };
			$scope.$on('$viewContentLoaded',function(){
				$scope.ifmDom = document.getElementById('cmsIfm');
				$scope.ifmDom.src ="http://192.168.12.127:8081/zonekeyeos/a/cmsdemo/information/page?"+$scope.cmscookie;
			});
			$scope.changeIframe = function(){
				console.log('uuuuuuuuuu');
				$scope.ifmDom.src ="http://192.168.12.127:8081/zonekeyeos/a/cmsdemo/information/info_list"
			}
            init();
        }]);
});