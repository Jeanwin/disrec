define(['app'
    ], function(app) {
    app.registerProvider(
        'routeDefs',
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$couchPotatoProvider',
            '$locationProvider',
            '$provide',
            function (
                $stateProvider,
                $urlRouterProvider,
                $couchPotatoProvider
                ) {

                this.$get = function() {
                    // this is a config-time-only provider
                    // in a future sample it will expose runtime information to the app
                    return {};
                };

                $urlRouterProvider
                    .when('', '/');

                $urlRouterProvider.otherwise('/dashboard');

                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['dashboard/dashboard.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'dashboard/dashboard.tpl.html',
                                controller: 'DashboardCtrl'
                            }
                        }
                    })

                    //登陆、退出
                    .state('page', {
                        url: '/page',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['page/page.login.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'page/page.login.tpl.html',
                                controller: 'LoginMainCtrl'
                            }

                        }
                    })

                    //绑定邮箱；电话
                    .state('binding', {
                        url: '/binding',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['binding/binding.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'binding/binding.main.tpl.html',
                                controller: 'BindingMainCtrl'
                            }
                        }
                    })

                    //找回密码
                    .state('retrievePwd', {
                        url: '/retrievePwd',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['retrievePwd/page.retrievePwd.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'retrievePwd/page.retrievePwd.tpl.html',
                                controller: 'RetrievePwdMainCtrl'
                            }
                        }
                    })

                    //关于系统
                    .state('kern', {
                        url: '/kern',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['kern/kern.list.ctrl'])
                        },
                        views:{
                            'list': {
                                templateUrl: 'kern/kern.list.tpl.html',
                                controller: 'KernCtrl'
                            }
                        }
                    })
                    //教室管理
                    .state('classrooms', {
                        url: '/classrooms',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'classrooms/classrooms.main.tpl.html',
                                controller: 'ClassRoomMainCtrl'
                            }
                        }
                    })
//                   - 教室策略
                    .state('classrooms.tactics', {
                        url: '/tactics',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/tactics/classrooms.tactics.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/tactics/classrooms.tactics.tpl.html',
                                controller: 'ClassroomTacticsCtrl'
                            }
                        }
                    })
//                   - 值班室
                    .state('classrooms.duty', {
                        url: '/duty',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.duty.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.duty.tpl.html',
                                controller: 'DutyCtrl'
                            }
                        }
                    })
//                   - 教室设置
                    .state('classrooms.setup', {
                        url: '/setup',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/setup/classrooms.setup.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/setup/classrooms.setup.tpl.html',
                                controller: 'ClassRoomSetupCtrl'
                            }
                        }
                    })
//                   - 设备管理
                    .state('classrooms.facility', {
                        url: '/facility',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.facility.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.facility.tpl.html',
                                controller: 'FacilityCtrl'
                            }
                        }
                    })
 //                   - 版本管理
                    .state('classrooms.version', {
                        url: '/version',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.version.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.version.tpl.html',
                                controller: 'VersionCtrl'
                            }
                        }
                    })
                    // - 广播管理
                    .state('classrooms.broadcast', {
                        url: '/broadcast',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.broadcast.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.broadcast.tpl.html',
                                controller: 'BroadCastCtrl'
                            }
                        }
                    })
                     // - 卡管理
                    .state('classrooms.fixedTask', {
                        url: '/fixedTask',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.fixedTask.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.fixedTask.tpl.html',
                                controller: 'FixedTaskCtrl'
                            }
                        }
                    })
                     // - 卡管理
                    .state('classrooms.cardSet', {
                        url: '/cardSet',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.cardSet.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.cardSet.tpl.html',
                                controller: 'CardSetCtrl'
                            }
                        }
                    })
                     // - 教室日志
                    .state('classrooms.log', {
                        url: '/log/:ipInfo',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.log.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.log.tpl.html',
                                controller: 'LogCtrl'
                            }
                        }
                    })
                    // - 教室日志
                    .state('classrooms.configFacility', {
                        url: '/configFacility/:id',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.configFacility.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.configFacility.tpl.html',
                                controller: 'ConfigFacilityCtrl'
                            }
                        }
                    })
//                   - 教室日常管理
                    .state('classrooms.daily', {
                        url: '/daily',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['classrooms/classrooms.daily.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'classrooms/classrooms.daily.tpl.html',
                                controller: 'DailyCtrl'
                            }
                        }
                    })
                    //课表管理
                    .state('scheduleManagements', {
                        url: '/scheduleManagements',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'scheduleManagements/scheduleManagements.main.tpl.html',
                                controller: 'ScheduleManagementMainCtrl'
                            }
                        }
                    })
                    //-直播课表
                    .state('scheduleManagements.live', {
                        url: '/live',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.live.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/scheduleManagements.live.tpl.html',
                                controller: 'ScheduleManagementsLiveCtrl'
                            }
                        }
                    })
//                   - 周课表
                    .state('scheduleManagements.week', {
                        url: '/week',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.week.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/scheduleManagements.week.tpl.html',
                                controller: 'ScheduleManagementsWeekCtrl'
                            }
                        }
                    })
//                   - 课表编辑
                    .state('scheduleManagements.edit', {
                        url: '/edit',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.edit.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/scheduleManagements.edit.tpl.html',
                                controller: 'ScheduleManagementsEditCtrl'
                            }
                        }
                    })
                    //- 我的课表
                    .state('scheduleManagements.myschedule', {
                        url: '/myschedule',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.myschedule.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/scheduleManagements.myschedule.tpl.html',
                                controller: 'ScheduleManagementsmyscheduleCtrl'
                            }
                        }
                    })
                     //- 手动录课
                    .state('scheduleManagements.handleRecord', {
                        url: '/handleRecord',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/scheduleManagements.handleRecord.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/scheduleManagements.handleRecord.tpl.html',
                                controller: 'ScheduleManagementshandleRecordCtrl'
                            }
                        }
                    })
                    //***学期设置
                    .state('scheduleManagements.termSet', {
                        url: '/termSet',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/termSet/termSet.list.ctrl'])
                        },
                        views:{
                        	'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/termSet/termSet.list.tpl.html',
                                controller: 'TermSetCtrl'
                            }
                        }
                    })
                    //***节次设置
                    .state('scheduleManagements.Classtime', {
                        url: '/Classtime',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['scheduleManagements/termSet/Classtime.list.ctrl'])
                        },
                        views:{
                            'scheduleManagements-manage': {
                                templateUrl: 'scheduleManagements/termSet/Classtime.list.tpl.html',
                                controller: 'ClassTimeCtrl'
                            }
                        }
                    })
                    //***节次设置--新方案的添加或编辑
                    .state('AddorEditScheme', {
                        url: '/AddorEditScheme/:classtype/:datebegin/:dateend/:Classtime',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['termSet/AddorEditScheme.list.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'termSet/AddorEditScheme.list.tpl.html',
                                controller: 'AddorEditSchemeCtrl'
                            }
                        }
                    })


                    //导播台
                    .state('director', {
                        url: '/director',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['director/director.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'director/director.main.tpl.html',
                                controller: 'DirectorMainCtrl'
                            }
                        }
                    })

                    //课程巡视
                    .state('coursepatrol', {
                        url: '/coursepatrol/:activeNode',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['coursepatrol/coursepatrol.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'coursepatrol/coursepatrol.main.tpl.html',
                                controller: 'CourseTourMainCtrl'
                            }
                        }
                    })
                    //--电视墙按钮
                    .state('courseTV', {
                        url: '/courseTV',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['coursepatrol/courseTV/coursepatrol.courseTV.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'coursepatrol/courseTV/coursepatrol.courseTV.modal.html',
                                controller: 'CourseTVCtrl'
                            }
                        }
                    })
                    //课程巡视的时候，单机要点的视频窗口点击
                    .state('scrn', {
                        url: '/scrn/:video',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['coursepatrol/scrn/coursepatrol.scrn.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'coursepatrol/scrn/coursepatrol.scrn.modal.html',
                                controller: 'CourseScrnCtrl'
                            }
                        }
                    })
                    //资源管理
                    .state('resource', {
                        url: '/resource',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'resource/resource.main.tpl.html',
                                controller: 'ResourceMainCtrl'
                            }
                        }
                    })
                    //--资源上传
                    .state('resource.upload', {
                        url: '/upload',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.upload.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.upload.tpl.html',
                                controller: 'ResourceUploadCtrl'
                            }
                        }
                    })
                    //--视频资源
                    .state('resource.video', {
                        url: '/video',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.video.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.video.tpl.html',
                                controller: 'ResourceVideoCtrl'
                            }
                        }
                    })
                    //--视频资源--资源名称
                    .state('resource.resourcename', {
                        url: '/resourcename/:floder',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/video/resource.resourcename.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/video/resource.resourcename.modal.html',
                                controller: 'ResourceNameCtrl'
                            }
                        }
                    })
                    //教研管理
                    .state('teachResearch', {
                        url: '/teachResearch',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'teachResearch/teachResearch.main.tpl.html',
                                controller: 'TeachResearchMainCtrl'
                            }
                        }
                    })
                    //--教研管理--听课模板
                    .state('teachResearch.listenModal', {
                        url: '/listenModal',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.listenModal.ctrl'])
                        },
                        views:{
                            'teachResearch-manage': {
                                templateUrl: 'teachResearch/teachResearch.listenModal.tpl.html',
                                controller: 'ListenModalCtrl'
                            }
                        }
                    })
                    //--教研管理--评课模板
                    .state('teachResearch.classEvaluation', {
                        url: '/classEvaluation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.classEvaluation.ctrl'])
                        },
                        views:{
                            'teachResearch-manage': {
                                templateUrl: 'teachResearch/teachResearch.classEvaluation.tpl.html',
                                controller: 'ClassEvaluationCtrl'
                            }
                        }
                    })
                    //--教研管理--听课记录
                    .state('teachResearch.listenRecord', {
                        url: '/listenRecord',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.listenRecord.ctrl'])
                        },
                        views:{
                            'teachResearch-manage': {
                                templateUrl: 'teachResearch/teachResearch.listenRecord.tpl.html',
                                controller: 'ListenRecordCtrl'
                            }
                        }
                    })
                    //--教研管理--活动管理
                    .state('teachResearch.actionManage', {
                        url: '/actionManage',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.actionManage.ctrl'])
                        },
                        views:{
                            'teachResearch-manage': {
                                templateUrl: 'teachResearch/teachResearch.actionManage.tpl.html',
                                controller: 'ActionManageCtrl'
                            }
                        }
                    })
                    //--教研管理--教研统计
                    .state('teachResearch.teachStatistics', {
                        url: '/teachStatistics',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['teachResearch/teachResearch.teachStatistics.ctrl'])
                        },
                        views:{
                            'teachResearch-manage': {
                                templateUrl: 'teachResearch/teachResearch.teachStatistics.tpl.html',
                                controller: 'TeachStatisticsCtrl'
                            }
                        }
                    })


                    //--图片资源
                    .state('resource.image', {
                        url: '/image',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.image.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.image.tpl.html',
                                controller: 'ResourceImageCtrl'
                            }
                        }
                    })
                    //--已发布资源
                    .state('resource.released', {
                        url: '/released',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.released.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.released.tpl.html',
                                controller: 'ResourceReleasedCtrl'
                            }
                        }
                    })
                     //--我的资源
                    .state('resource.myresource', {
                        url: '/myresource',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.myresource.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.myresource.tpl.html',
                                controller: 'MyresourceReleasedCtrl'
                            }
                        }
                    })
                     //--我的资源
                    .state('resource.recycle', {
                        url: '/recycle',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['resource/resource.recycle.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'resource/resource.recycle.tpl.html',
                                controller: 'ResourceRecycleCtrl'
                            }
                        }
                    })
                    //门户管理
                    .state('portal', {
                        url: '/portal',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['portal/portal.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'portal/portal.main.tpl.html',
                                controller: 'PortalMainCtrl'
                            }
                        }
                    })
                    //--门户信息
                    .state('portal.message', {
                        url: '/message',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['portal/portal.message.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'portal/portal.message.tpl.html',
                                controller: 'PortalMessageCtrl'
                            }
                        }
                    })
                    //图片管理
                    .state('portal.picture', {
                        url: '/picture',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['portal/portal.picture.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'portal/portal.picture.tpl.html',
                                controller: 'PortalPictureCtrl'
                            }
                        }
                    })
                    //通知公告
                    .state('portal.notice', {
                        url: '/notice',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['portal/portal.notice.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'portal/portal.notice.tpl.html',
                                controller: 'PortalNoticeCtrl'
                            }
                        }
                    })
                    //通知公告--发布公告
                    .state('portal.announce', {
                        url: '/announce',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['portal/portal.announce.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'portal/portal.announce.modal.html',
                                controller: 'PortalAnnounceCtrl'
                            }
                        }
                    })
                    //系统设置
                    .state('system', {
                        url: '/system',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.main.tpl.html',
                                controller: 'SystemMainCtrl'
                            }
                        }
                    })
                    //--用户管理
                    .state('system.user', {
                        url: '/user/:id/:parentname',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.user.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.user.tpl.html',
                                controller: 'SystemUserCtrl'
                            }
                        }
                    })
                    //--用户管理--添加或编辑用户
                    .state('system.useradd', {
                        url: '/useradd/:userID/:name/:sex/:organization/:email/:state/:classify/:year/:phone',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/useradd/system.add.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/useradd/system.add.modal.html',
                                controller: 'SystemAddCtrl'
                            }
                        }
                    })
                    //--机构管理
                    .state('system.organization', {
                        url: '/organization',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.organization.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.organization.tpl.html',
                                controller: 'SystemOrganizationCtrl'
                            }
                        }
                    })
                    //--权限管理
                    .state('system.limits', {
                        url: '/limits',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.limits.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.limits.tpl.html',
                                controller: 'SystemLimitsCtrl'
                            }
                        }
                    })
                    //--范围管理
                    .state('system.scope', {
                        url: '/scope',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.scope.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.scope.tpl.html',
                                controller: 'SystemScopeCtrl'
                            }
                        }
                    })
                    //--授权管理
                    .state('system.impower', {
                        url: '/impower',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.impower.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.impower.tpl.html',
                                controller: 'SystemImpowerCtrl'
                            }
                        }
                    })
                    //--数据字典
                    .state('system.data', {
                        url: '/data',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.data.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.data.tpl.html',
                                controller: 'SystemDataCtrl'
                            }
                        }
                    })
                    //--平台设置
                    .state('system.platform', {
                        url: '/platform',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.platform.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.platform.tpl.html',
                                controller: 'SystemPlatFormCtrl'
                            }
                        }
                    })
                    //--缓存管理
                    .state('system.cache', {
                        url: '/cache',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.cache.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.cache.tpl.html',
                                controller: 'SystemPlatFormCtrl'
                            }
                        }
                    })
                    //--服务器配置
                    .state('system.serverConfigure', {
                        url: '/serverConfigure',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['system/system.serverConfigure.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'system/system.serverConfigure.tpl.html',
                                controller: 'SystemServerConfigureCtrl'
                            }
                        }
                    })
                    //日志
                    .state('logs', {
                        url: '/logs',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['logs/logs.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'logs/logs.main.tpl.html',
                                controller: 'LogsMainCtrl'
                            }
                        }
                    })
                    //报警日志
                    .state('logs.alarmLog', {
                        url: '/alarmLog',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['logs/logs.alarmLog.ctrl'])
                        },
                        views:{
                            'logs-alarmLog': {
                                templateUrl: 'logs/logs.alarmLog.tpl.html',
                                controller: 'logAlarmCtrl'
                            }
                        }
                    })
                    //语音呼叫
                    .state('logs.voiceCall', {
                        url: '/voiceCall',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['logs/logs.voiceCall.ctrl'])
                        },
                        views:{
                            'logs-alarmLog': {
                                templateUrl: 'logs/logs.voiceCall.tpl.html',
                                controller: 'VoiceCallCtrl'
                            }
                        }
                    })
                    //系统日志
                    .state('statistical', {
                        url: '/statistical',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['statistical/statistical.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'statistical/statistical.main.tpl.html',
                                controller: 'StatisticalMainCtrl'
                            }
                        }
                    })
                     //日志管理
                    .state('statistical.logManage', {
                        url: '/logManage',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['statistical/statistical.logManage.ctrl'])
                        },
                        views:{
                            'statistical-manage': {
                                templateUrl: 'statistical/statistical.logManage.tpl.html',
                                controller: 'logManageCtrl'
                            }
                        }
                    })
                    //消息
                    .state('information', {
                        url: '/information',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['information/information.list.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'information/information.list.tpl.html',
                                controller: 'InformationListCtrl'
                            }
                        }
                    })
                     //发送消息
                    .state('information.send', {
                        url: '/send',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['information/send/information.send.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'information/send/information.send.modal.html',
                                controller: 'InformationSendCtrl'
                            }
                        }
                    })
                    //已发送消息
                    .state('information.sent', {
                        url: '/sent',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['information/sent/information.sent.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'information/sent/information.sent.modal.html',
                                controller: 'InformationSentCtrl'
                            }
                        }
                    })

                    //系统管理
                    .state('admin', {
                        url: '/admin',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['admin/admin.main.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'admin/admin.main.tpl.html',
                                controller: 'AdminMainCtrl'
                            }
                        }
                    })

                    //实例
                    .state('sample', {
                        url: '/sample',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['sample/sample.main.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'sample/sample.main.tpl.html',
                                controller: 'SampleMainCtrl'
                            }
                        }
                    })
                    //消息
                    .state('message', {
                        url: '/message',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.main.ctrl'])
                        },
                        views: {
                            'main': {
                                templateUrl: 'message/message.main.tpl.html',
                                controller: 'MessageMainCtrl'
                            }
                        }
                    })
                    //cms
                    .state('cms', {
                        url: '/cms',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['cms/cms.main.ctrl'])
                        },
                        views: {
                            'main': {
                                templateUrl: 'cms/cms.main.tpl.html',
                                controller: 'CmsMainCtrl'
                            }
                        }
                    })
                    
                ;
            }
        ]
    );
});