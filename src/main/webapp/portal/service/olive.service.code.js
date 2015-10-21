define(['angular', 'config','codes'], function (angular, config, codes) {
    /*-----------------------------------------
     *获取字典接口
     ------------------------------------------*/

    angular.module('olive.service.code', [])

        .constant('CodeServiceConfig', {
           files:{
               getRemoteCodes:'data/code.json'
           },
            urls:{
                getRemoteCodes: config.backend.ip + config.backend.base + 'code/getRemoteCodes.do'
            }
        })
        .factory('CodeService',['$http', '$q', 'CodeServiceConfig', function ($http, $q, codeServiceConfig) {

            var bussy = false;



            var readCode = function (_codeType, _id) {
                $.each(codes[_codeType], function(index, code){
                    if(code.id === _id){
                        return code.value;
                    }
                });
                return '';
            };

            return {



                /**
                 * 浏览查询数据字典，判断其中是否有对应项
                 * @param contAttr  区别比例非比例合约
                 * @param keywords  字典对象（通常为一个属性）
                 * @param user   操作用户信息
                 */
                getCodes: function ( keywords, user){
                	var holdFlag = keywords.holdFlag;
                	delete keywords.holdFlag;
                    var deffered = $q.defer();
                    if(bussy){
                        deffered.reject('bussy');
                    }
                    if(codes[ keywords.id + "." + keywords.value]){
                        bussy = false;
                        deffered.resolve(codes[keywords.id + "." + keywords.value]);
                    }else{
                        bussy = true;
                         this.getRemoteCodes( keywords, user)
                             .then(
                             function(data){
                             
                                 console.log("get remote code");
                                 console.log(keywords);
                                 console.log(data);
                                 if(angular.isDefined(holdFlag) && holdFlag === false){
                                	 if(angular.isDefined(data.data) && data.data.length > 0){
                                		 deffered.resolve( data.data);
                                	 }else{
                                		 deffered.resolve([]);
                                	 }
                                 }else{
                                	  if(angular.isUndefined(data.data)){
                                          codes[ keywords.id + "." + keywords.value] = [];
                                       }else if(data.data.length <1){
                                          codes[ keywords.id + "." + keywords.value] = [];
                                      }else
                                        codes[ keywords.id + "." + keywords.value] =data.data;
                                        deffered.resolve(codes[ keywords.id + "." + keywords.value]);
                                 }
                                 bussy = false;
                             },
                             function(e, code){
                              console.log("get remote code error");
                               console.log(code);
                                 codes[ keywords.id + "." + keywords.value]=[];
                                bussy = false;
                                deffered.reject(code);
                            });

                     }
                    return deffered.promise;
                   },

                getCode: function (contAttr, keywords, user){
                    return "new";

                    var deffered = $q.defer();
                    if(bussy)
                        deffered.reject('bussy');
                    if(isLoaded[contAttr + '.' + keywords.id]){
                        var codeValue = readCode(contAttr + '.' + keywords.id, keywords.codeId);
                        deffered.resolve(codeValue);
                    }else{
                        bussy = true;
                        this.getCodes(contAttr, keywords, user)
                            .then(
                            function(){
                                var codeValue = readCode(contAttr + '.' + keywords.id, keywords.codeId);
                                deffered.resolve(codeValue);
                            },
                            function(e, code){
                                bussy = false;
                                deffered.reject(code);
                            });
                    }
                    return deffered.promise;
                },

               //修改向后台传值时合同类型参数
                exchangeAttr : function(contAttr){
                    if(contAttr === "prop"){
                        return "P";
                    }else{
                        return "PS"
                    }
                },

                /**
                 * 获取字典
                 * @param contAttr  区别比例非比例合约
                 * @param keywords  字典对象（通常为一个属性）
                 * @param user   操作用户信息
                 */
                getRemoteCodes: function ( keywords, user) {

                    var deffered = $q.defer();
                         $http({
                             method:config.data.method==='files'? 'GET':'POST',
                             url: codeServiceConfig[config.data.method].getRemoteCodes,
                             headers: {
                             },
                             data:{
                                 keywords:keywords,
                                 user:user
                             },
                             timeout:  config.backend.timeout
                         })
                         .success(function(data){
                            deffered.resolve(data);
                         })
                         .error(function(e, code){
                            deffered.reject(code);
                         });
                          return deffered.promise;
                }
            };
        }]);
});