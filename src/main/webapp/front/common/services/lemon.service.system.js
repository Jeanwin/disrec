/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.system', [])
        .constant('SystemServiceConfig', {
            files:{
                searchData:  'data/datas.list.json',
                addclassif:  'data/datas.list.json',
                editclassif:  'data/datas.list.json',
                delclassif:  'data/datas.list.json',
                searchclassify:  'data/datas.list.json',
                datatree:  'data/user/system.datatree.json',
                searchImpower:  'data/impowers.list.json',
                search_impowers: 'data/search_impowers.list.json',
                rangeView_scope: 'data/user/rangeView_scope.json',
                rangeView_deletes: 'data/user/rangeView_delete.json',
                rangeView_delete: 'data/user/rangeView_delete.json',
                sysrole_roles: 'data/user/sysrole_roles.json',
                select_rolename: 'data/user/sysrole_limitname.json',
                select_limit: 'data/user/sysrole_limits_roles.json',
                Addlimits: 'data/user/sysrole_limits_roles.json',
                Addlimitsname: 'data/user/sysrole_limits_roles.json',
                Deletelimit: 'data/user/sysrole_limits_roles.json',
                add_Impower: 'data/user/add_Impower.json',
                searchOrganization:  'data/organizations.list.json',
                addOrganization:  'data/organizations.list.json',
                editOrganization:  'data/organizations.list.json',
                delOrganization:  'data/organizations.list.json',
                searchorganization:  'data/organizations.list.json',
                systemScope:  'data/user/system.scopes.json',
                Addscope:  '',
                addNewScope:  'data/user/system.scopes.json',
                DeleteClass:  'data/user/system.scopes.json',
                searchUser:  'data/users.list.json',
                searchtype:  'data/user/organizations.list.json',
                selectsex:  'data/user/user.selectSex.json',
                selectclassfiy:  'data/user/user.selectClassfiy.json',
                selectstatus:  'data/user/user.selectstatus.json',
                findUserID:  'data/users.list.json',
                findOrganization:  'data/organizations.list.json',
                delUser:  'data/users.list.json',
                editUser:  'data/users.list.json',
                AddUserMessage:  'data/users.list.json',
                EditUserMessage:  'data/users.list.json',
                exportData:  'data/users.list.json',
                addUser:  'data/users.list.json',
                SaveEditServers:  'data/users.list.json',
                SaveAddServers:  'data/users.list.json',
                SaveDelServers:  'data/users.list.json',
                SaveAddPorts:  'data/users.list.json',
                SaveEditPorts:  'data/users.list.json',
                SaveDelPorts:  'data/users.list.json',
                SelectServers:'data/user/serverSet.json'
                },
            urls:{
                searchData: config.backend.ip + config.backend.base + '/syscode/codes',
                addclassif: config.backend.ip + config.backend.base + '/syscode/save',
                editclassif: config.backend.ip + config.backend.base + '/syscode/update',
                delclassif: config.backend.ip + config.backend.base + '/syscode/delete',
                checkName:config.backend.ip + config.backend.base + 'syscode/checkName',//校验字典名称是否重复
                checkValue:config.backend.ip + config.backend.base + 'syscode/checkValue',//校验字典值是否重复
                searchclassify: config.backend.ip + config.backend.base + '',
                datatree: config.backend.ip + config.backend.base + '/syscode/dicTree',
                searchImpower: config.backend.ip + config.backend.base + 'rangeView/ranges',
                search_impowers: config.backend.ip + config.backend.base + 'rangeView/rangeuser',
                rangeView_scope: config.backend.ip + config.backend.base + 'rangeView/scope',
                rangeView_deletes:config.backend.ip + config.backend.base + 'rangeView/deleteRange',
                rangeView_delete:config.backend.ip + config.backend.base + 'rangeView/delete',
                sysrole_roles: config.backend.ip + config.backend.base + 'sysrole/roles',
                select_rolename: config.backend.ip + config.backend.base + 'sysfunction/functions',
                select_limit: config.backend.ip + config.backend.base + 'sysrole/roles',
                Addlimits: config.backend.ip + config.backend.base + 'sysrole/save',
                Addlimitsname: config.backend.ip + config.backend.base + 'sysrole/updatePower',
                Deletelimit: config.backend.ip + config.backend.base + 'sysrole/delete',
                add_Impower: config.backend.ip + config.backend.base + 'rangeView/save',
                searchOrganization: config.backend.ip + config.backend.base + 'deptView/depts',
                addOrganization: config.backend.ip + config.backend.base + 'deptView/save',
                editOrganization: config.backend.ip + config.backend.base + 'deptView/update',
                delOrganization: config.backend.ip + config.backend.base + 'deptView/delete',
                searchorganization: config.backend.ip + config.backend.base + '',
                systemScope: config.backend.ip + config.backend.base + '/rangeView/scope',
                Addscope: config.backend.ip + config.backend.base + '/rangeView/saveRange',
                DeleteClass: config.backend.ip + config.backend.base + 'rangeView/delete',
                addNewScope: config.backend.ip + config.backend.base + '/rangeView/updatePower',
                addUser: config.backend.ip + config.backend.base + 'userView/save',
                editUser: config.backend.ip + config.backend.base + 'userView/update',
                searchtype: config.backend.ip + config.backend.base + 'syscode/deptType',
                selectsex: config.backend.ip + config.backend.base + '/syscode/sex',
                selectclassfiy: config.backend.ip + config.backend.base + '/syscode/identity',
                selectstatus: config.backend.ip + config.backend.base + '/syscode/areaType',
                findUserID: config.backend.ip + config.backend.base + '/userView/check',
                findOrganization: config.backend.ip + config.backend.base + '/deptView/check',
                delUser: config.backend.ip + config.backend.base + 'userView/delete',
                AddUserMessage: config.backend.ip + config.backend.base + 'userView/create',
                EditUserMessage: config.backend.ip + config.backend.base + 'userView/modify',
                exportData: config.backend.ip + config.backend.base + 'rest/curriculum/exportcurriculum',
                searchUser: config.backend.ip + config.backend.base + 'userView/users',
                SaveEditServers: config.backend.ip + config.backend.base + 'serverConfig/modifyServer',
                SaveAddServers: config.backend.ip + config.backend.base + 'serverConfig/saveServer',
                SaveDelServers: config.backend.ip + config.backend.base + 'serverConfig/deleteServer',
                SaveAddPorts: config.backend.ip + config.backend.base + 'port/savePort',
                SaveEditPorts: config.backend.ip + config.backend.base + 'port/updatePort',
                SaveDelPorts: config.backend.ip + config.backend.base + 'port/deletePort',
                SelectServers: config.backend.ip + config.backend.base + 'serverConfig/servers',
                plateForm: config.backend.ip + config.backend.base + 'plateForm/create',
                getPlateForm: config.backend.ip + config.backend.base + 'plateForm/list',
                showDeviceServerList:config.backend.ip + config.backend.base + 'serverConfig/showDeviceServerList',
                addOrRemoveDeviceServer:config.backend.ip + config.backend.base + 'serverConfig/addOrRemoveDeviceServer'
                }
        })
        .factory('SystemService',['$http', '$q', 'SystemServiceConfig', function ($http, $q, SystemServiceConfig) {
            return {
                /* 系统管理 接口查询 */
                /* 条件查询方法**********************************************************/
                /**
                 * @param keywords   查询、添加、编辑、删除条件
                 * @returns {Function|promise|promise|promise}
                 */
                 //应用到中控信息
                showDeviceServerList : function(keywords){
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.showDeviceServerList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                 //增加或者移除语音服务中的中控设备
                addOrRemoveDeviceServer : function(keywords){
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.addOrRemoveDeviceServer;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	//平台信息
            	plateForm : function(keywords){
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.plateForm;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
              //平台信息
            	getPlateForm : function(keywords){
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.getPlateForm;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //数据字典列表显示
                searchData : function(keywords,treeid,pagination,user){
                    console.log(keywords,treeid,pagination,user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchData: SystemServiceConfig.urls.searchData;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            treeid:treeid,
                            page:pagination,
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
                },
                //数据字典-分类添加
                addclassif : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.addclassif: SystemServiceConfig.urls.addclassif;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //数据字典-分类编辑
                editclassif : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.editclassif: SystemServiceConfig.urls.editclassif;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //数据字典-分类删除
                delclassif : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.delclassif: SystemServiceConfig.urls.delclassif;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //校验字典名称是否重复
                checkName : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.checkName;
                    $http({
                        method: 'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
              //校验字典值是否重复
                checkValue : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = SystemServiceConfig.urls.checkValue;
                    $http({
                        method: 'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //数据字典-查询功能
                searchclassify : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchclassify: SystemServiceConfig.urls.searchclassify;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords
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
                },
                //数据字典树
                datatree : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.datatree: SystemServiceConfig.urls.datatree;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords
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
                },

                //授权管理
                searchImpower : function(keywords, pagination, user){
                    console.log(keywords, pagination, user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchImpower: SystemServiceConfig.urls.searchImpower;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            page:pagination,
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
                },
                //授权管理-添加管理员
                search_impowers : function(name){
                    console.log(name);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.search_impowers: SystemServiceConfig.urls.search_impowers;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "name":name
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
                },
                //授权管理-添加管理员-教室范围，机构范围
                rangeView_scope : function(){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.rangeView_scope: SystemServiceConfig.urls.rangeView_scope;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{

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
                },
                //授权管理-删除
                rangeView_delete : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.rangeView_delete: SystemServiceConfig.urls.rangeView_delete;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            loginname:keywords.loginname
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
                },
                //授权管理-批量删除
                rangeView_deletes : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.rangeView_deletes: SystemServiceConfig.urls.rangeView_deletes;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //授权管理-添加管理员-角色范围
                sysrole_roles : function(){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.sysrole_roles: SystemServiceConfig.urls.sysrole_roles;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{

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
                },
                //授权管理-显示角色名称
                select_rolename : function(){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.select_rolename: SystemServiceConfig.urls.select_rolename;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{

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
                },
                //权限管理-查询角色权限
                select_limit : function(){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.select_limit: SystemServiceConfig.urls.select_limit;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{

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
                },
                //权限管理-角色权限添加
                Addlimits : function(rolename){
                    console.log(rolename);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.Addlimits: SystemServiceConfig.urls.Addlimits;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:rolename,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //权限管理-角色权限名称添加
                Addlimitsname : function(rolename){
                    console.log(rolename);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.Addlimitsname: SystemServiceConfig.urls.Addlimitsname;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:rolename,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //权限管理-角色权限删除
                Deletelimit : function(rolename){
                    console.log(rolename);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.Deletelimit: SystemServiceConfig.urls.Deletelimit;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:rolename,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //添加管理员
                add_Impower : function(administrator){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.add_Impower: SystemServiceConfig.urls.add_Impower;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "loginname":administrator.loginname,
                            "name":administrator.name,
                            "roleList":administrator.roleList,
                            "scopeList":administrator.scopeList
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
                },
                //机构管理
                searchOrganization : function(keywords,treeid,pagination,user){
                    console.log(keywords,treeid,pagination,user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchOrganization: SystemServiceConfig.urls.searchOrganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            treeid:treeid,
                            page:pagination,
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
                },
                //机构添加
                addOrganization : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.addOrganization: SystemServiceConfig.urls.addOrganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //机构编辑
                editOrganization : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.editOrganization: SystemServiceConfig.urls.editOrganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //机构删除
                delOrganization : function(kewords){
                    console.log(kewords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.delOrganization: SystemServiceConfig.urls.delOrganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:kewords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //机构查询
                searchorganization : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchorganization: SystemServiceConfig.urls.searchorganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords
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
                },
                //范围管理
                systemScope : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.systemScope: SystemServiceConfig.urls.systemScope;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords
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
                },
                //添加范围名称
                Addscope : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.Addscope: SystemServiceConfig.urls.Addscope;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //添加及修改教室范围
                addNewScope : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.addNewScope: SystemServiceConfig.urls.addNewScope;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //用户管理
                searchUser : function(keywords, areaid, pagination, user){
                    console.log(keywords, areaid, pagination, user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchUser: SystemServiceConfig.urls.searchUser;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            treeid:areaid,
                            page:pagination,
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
                },
                //用户添加
                addUser : function(user){
                    console.log(user);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.addUser: SystemServiceConfig.urls.addUser;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:user,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //用户编辑
                editUser : function(user){
                    console.log(user);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.editUser: SystemServiceConfig.urls.editUser;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:user,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //弹框属性加载注入
                searchtype : function(type, pagination){
                    console.log(type, pagination);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.searchtype: SystemServiceConfig.urls.searchtype;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:type
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
                },
                //性别查询接口
                selectsex : function(type, pagination){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.selectsex: SystemServiceConfig.urls.selectsex;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:type
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
                },
                //身份查询接口
                selectclassfiy : function(type){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.selectclassfiy: SystemServiceConfig.urls.selectclassfiy;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:type
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
                },
                //状态查询接口
                selectstatus : function(type){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.selectstatus: SystemServiceConfig.urls.selectstatus;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:type
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
                },
                //用户添加--用户ID验重
                findUserID : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.findUserID: SystemServiceConfig.urls.findUserID;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                //机构添加--机构代码验重
                findOrganization : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.findOrganization: SystemServiceConfig.urls.findOrganization;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //删除用户列表
                delUser : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.delUser: SystemServiceConfig.urls.delUser;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //添加用户列表--无图片
                AddUserMessage : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.AddUserMessage: SystemServiceConfig.urls.AddUserMessage;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //修改用户列表--无图片
                EditUserMessage : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.EditUserMessage: SystemServiceConfig.urls.EditUserMessage;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //初始化查询服务器列表
                SelectServers : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SelectServers: SystemServiceConfig.urls.SelectServers;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //保存编辑服务器列表
                SaveEditServers : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveEditServers: SystemServiceConfig.urls.SaveEditServers;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //保存添加服务器列表
                SaveAddServers : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveAddServers: SystemServiceConfig.urls.SaveAddServers;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //删除服务器列表
                SaveDelServers : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveDelServers: SystemServiceConfig.urls.SaveDelServers;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            id:keywords.id
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
                },
                //添加端口列表
                SaveAddPorts : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveAddPorts: SystemServiceConfig.urls.SaveAddPorts;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //修改端口列表
                SaveEditPorts : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveEditPorts: SystemServiceConfig.urls.SaveEditPorts;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //删除端口列表
                SaveDelPorts : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.SaveDelPorts: SystemServiceConfig.urls.SaveDelPorts;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "id":keywords.id
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
                },
                //导出问题数据
                exportData : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?SystemServiceConfig.files.exportData: SystemServiceConfig.urls.exportData;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            excelbatch:keywords
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
                },
                //教室范围删除
                DeleteClass : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? SystemServiceConfig.files.DeleteClass : SystemServiceConfig.urls.DeleteClass;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "rangeid": keywords
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
                },
                /**
                 * 显示账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型 [0]:预付保费  [1]:调整保费
                 * @param keywords     数据  [合约编号，账单期]
                 * @param pagination  分页
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchBill:function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan){

                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchBill[billType] : billServiceConfig.urls.searchBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{

                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 账单确认
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                confirmBill:function(contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.confirmBill : billServiceConfig.urls.confirmBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 超赔临分(分出)账务--条件查询
                 * @param contAttr  非比例【PS】/比例【P】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param certiType  分保类型
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchRecertiBill:function(contAttr, inOutMrk, certiType, keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchRecertiBill[contAttr] : billServiceConfig.urls.searchRecertiBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            inOutMrk:inOutMrk,
                            certiType:certiType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 预付费对内 ---导入
                 * @param importType  [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param file  文件对象
                 * @param keywords  数据
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 * 龙 ：
                 * @param  importType [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param user
                 * @param lan
                 * file  file [所上传的文件]
                 */
                importFhxBill:function(importType,_file, keywords, user, lan){
                    var deffered = $q.defer();
                    console.log("导入类型--start");
                    console.log(importType);
                    console.log("导入类型--end");
                    console.log("文件对象--_file");
                    console.log(_file);
                    console.log("文件对象--_file");
                    var _url = config.data.method==='files'?billServiceConfig.files.importFhxBill : billServiceConfig.urls.importFhxBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            importType:importType,
                            file:_file,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 调整保费---录入实际保费(赔付率)
                 * @param keywords
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getSectionDtl:function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.getSectionDtl : billServiceConfig.urls.getSectionDtl;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //非比例分出账务处理------------------------------end-----------------------------------------------------
                /**
                 * 获取账单期
                 * @param contractNo  暂存编号
                 */
                getBillDate: function (contAttr, contractNo, user, lan) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? billServiceConfig.files.getBillDate : billServiceConfig.urls.getBillDate;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contractNo:contractNo,
                            user:user,
                            lan:lan
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