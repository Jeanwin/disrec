/*
 * mc-lemon
 * by Jack MagusCreation
 * Version: 0.1.0 - 2014-09-28
 */

define(['angular',
        'codes',
        'config',
        'locale-zh-cn',
        'common/mc/mc.validator'
        ], function (angular, codes, config) {


    angular.module('mc.lemon', [
                                'ngLocale',
                                'mc.code',
                                'mc.validator'
    ]);

    angular.module('mc.code', [])
    /**
     * 代码
     * @param
     */
        .constant('CodeServiceConfig', {
            files:{
                //数据字典
                com_code_value_list:'data/com_code_value_list.json'
            },
            urls:{
                //数据字典
                com_code_value_list:config.backend.ip+'com_code_value/list'
            }
        })
        .factory('CodeService',['$http', '$q', 'CodeServiceConfig', function ($http, $q, CodeServiceConfig) {

            var localCodes = codes;

            var getLocalCodes = function (codetype) {
                return localCodes[codetype];
            };

            var getLocalCode = function (code, codetype) {

                if(!localCodes[codetype]) return '';

                var result = '';

                $.each(localCodes[codetype],function(index, _code){
                    if(_code.codevalue === code){
                        result = _code.codename;
                        return false;
                    }
                });

                return result;
            };

            return {

                getCode: function (code, codetype) {
                    var deffered = $q.defer();

                    var result = getLocalCode(code, codetype);

                    if(result==='') {

                        this.getRemoteCode({}, code, codetype).then (
                            function(){
                                deffered.resolve(getLocalCode(code, codetype));
                            },
                            function(){
                                deffered.reject('');
                            }
                        );

                    }else{
                        deffered.resolve(result);
                    }

                    return deffered.promise;
                },

                getLocalCode: function (code, codetype) {
                    return getLocalCode(code, codetype);
                },

                getRemoteCode: function (user, code, codetype) {
                    var deffered = $q.defer();

                    this.getRemoteCodes(user, codetype).then(
                        function(){
                            console.log('getRemoteCode');
                            deffered.resolve(getLocalCode(code, codetype));
                        },
                        function(){
                            deffered.reject('');
                        }
                    );

                    return deffered.promise;
                },
                //获取静态数据
                getStaticData : function(codetype){
                    var deffered = $q.defer();
                    deffered.resolve(getLocalCodes(codetype));
                    return deffered.promise;
                },
                //获取代码数组
                getCodes: function (user, codetype, parentcode) {
                    parentcode = parentcode || '';

                    var deffered = $q.defer();

                    if(localCodes[codetype]) {
                        if(parentcode==='')
                            deffered.resolve(getLocalCodes(codetype));
                        else{
                            $.each(localCodes[codetype], function(index, _code){
                                if(_code.codevalue===parentcode) {
                                    deffered.resolve(_code.codevaluelist);
                                    return false;
                                }
                            });
                        }
                    }else{
                        //如果本地没有，尝试从远程获取
                        console.log('尝试从远程获取');
                        return this.getRemoteCodes(user, codetype, parentcode);
                    }

                    return deffered.promise;
                },

                getLocalCodes : function (codetype) {
                    return getLocalCodes(codetype);
                },

                //获取远程数组
                getRemoteCodes : function(user, codetype, parentcode) {
                    console.log("进入getRemoteCodes");
                    user = user || {openid:'',userid:''};

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? CodeServiceConfig.files.com_code_value_list: CodeServiceConfig.urls.com_code_value_list;

                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "openid": user.openid,//"",//微信号
                            "userid": user.userid,//,//用户Id
                            "codetype":codetype , //数据字典类型，多个用半角逗号隔开
                            "parentcode": parentcode
                        }
                    })
                    .success(function(data){
                        localCodes[codetype] = data;
                        deffered.resolve(data);
                    })
                    .error(function(e, code){
                        deffered.reject(code);
                    });

                    return deffered.promise;
                }

            };
        }])
        .filter("mcCode", ['CodeService', function(CodeService) {

            return function(code, codetype) {

                codetype = codetype || '';

                var result = CodeService.getLocalCode(code, codetype);

                if(result==='')
                    result = code;

                return result;
            }
        }])

});