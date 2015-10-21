define(['angular', 'config','codes'], function (angular, config, codes) {
    /*-----------------------------------------
     *获取字典接口
     * 连带检索
     ------------------------------------------*/

    angular.module('lemon.service.code', [])

        .constant('CodeServiceConfig', {
            files:{
                getRemoteCodes: {
                    "objType" : 'data/code/objType.json',
                    "classCode" : 'data/code/classCode.json',
                    "currency" : 'data/code/currency.json',
                    "riskCodeByClass" : 'data/code/riskCodeByClass.json',
                    "classroomCode" : 'data/code/classroomCode.json',
                    "areaname" : 'data/code/areanameCode.json',
                    "username" : 'data/code/areanameCode.json',
                    "classname" : 'data/code/classnameCode.json',
                    "subject" : 'data/code/teacher.list.json'
                }
            },
            urls:{
                getRemoteCodes: {
                    "objType" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do',
                    "classCode" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do',
                    "currency" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do',
                    "riskCodeByClass" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do',
                    "classroomCode" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do',
                    "areaname" : config.backend.ip + config.backend.base + 'areaView/areasByName',
                    "username" : config.backend.ip + config.backend.base + 'rangeView/rangeuser',
                    "classname" : config.backend.ip + config.backend.base + 'deptView/deptByName',
                    "subject" : config.backend.ip + config.backend.base + 'code/getRemoteCodes.do'
                }
            }
        })
        .factory('CodeService',['$http', '$q', 'CodeServiceConfig', function ($http, $q, codeServiceConfig) {

            var bussy = false;



            var readCode = function (_codeType, _id) {
                console.log("readCode的_codeType参数：",_codeType);
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
                    console.log("getCodes里service的keywords参数：",keywords);
                    console.log("getCodes里service的user参数：",user);
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

                                if(angular.isDefined(holdFlag) && holdFlag === false){
                                    if(angular.isDefined(data) && data.length > 0){
                                        deffered.resolve( data);
                                    }else{
                                        deffered.resolve([]);
                                    }
                                }else{
                                    if(angular.isUndefined(data)){
                                        codes[ keywords.id + "." + keywords.value] = [];
                                    }else if(data.length <1){
                                        codes[ keywords.id + "." + keywords.value] = [];
                                    }else
                                        codes[ keywords.id + "." + keywords.value] =data;
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
                /**
                 * 浏览查询数据字典，判断其中是否有对应项
                 * @param contAttr  区别比例非比例合约
                 * @param keywords  字典对象（通常为一个属性）
                 * @param user   操作用户信息
                 */
                getCode: function (contAttr, keywords, user){
                    console.log("getCode的contAttr参数：",contAttr);
                    console.log("getCode的keywords参数：",keywords);
                    console.log("getCode的user参数：",user);
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
                    console.log("getRemoteCodes的keywords参数：",keywords);
                    console.log("getRemoteCodes的user参数：",user);
                    
                    //输入框录入值
                    var data;
                    if(angular.isDefined(keywords.value)){
                    	data = {
                			value:keywords.value,
                            user:user	
                    	};
                    } else if(angular.isDefined(keywords.name)){
                    	data = {
                			name:keywords.name,
                            user:user	
                    	};
                    }
                    
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? codeServiceConfig.files.getRemoteCodes[keywords.id] : codeServiceConfig.urls.getRemoteCodes[keywords.id];
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:data,
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