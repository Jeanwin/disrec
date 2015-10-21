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

                $urlRouterProvider.otherwise('/homePage');

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
                    //首页
                    .state('homePage', {
                        url: '/homePage',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['homePage/homePage.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'homePage/homePage.main.tpl.html',
                                controller: 'HomePageMainCtrl'
                            }
                        }
                    })
                    //直播课程
                    .state('liveCourses', {
                        url: '/liveCourses',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['liveCourses/liveCourses.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'liveCourses/liveCourses.main.tpl.html',
                                controller: 'liveCoursesMainCtrl'
                            }
                        }
                    })
                    //直播课程主页
                    .state('liveCourses.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['liveCourses/liveCourses.main.ctrl'])
                        },
                        views:{
                            'liveCourse-manage': {
                                templateUrl: 'liveCourses/operation.html',
                                controller: 'liveCoursesMainCtrl'
                            }
                        }
                    })
                    
//                   精品课程
                    .state('excellentCourse', {
                        url: '/excellentCourse',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'excellentCourse/excellentCourse.main.tpl.html',
                                controller: 'ExcellentCourseMainCtrl'
                            }
                        }
                    })

                    //精品课程主页
                    .state('excellentCourse.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.main.ctrl'])
                        },
                        views:{
                            'ExcellentCourse-manage': {
                                templateUrl: 'excellentCourse/operation.html',
                                controller: 'ExcellentCourseMainCtrl'
                            }
                        }
                    })
                //精品课程--详细观看
                    .state('excellentCourseShow', {
                        url: '/excellentCourseShow',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.excellentCourseShow.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'excellentCourse/excellentCourse.excellentCourseShow.tpl.html',
                                controller: 'ExcellentCourseShowMainCtrl'
                            }
                        }
                    })
                    //直播课程--详细观看
                    .state('liveCoursesShow', {
                        url: '/liveCoursesShow',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['liveCourses/liveCourses.liveCoursesShow.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'liveCourses/liveCourses.liveCoursesShow.tpl.html',
                                controller: 'LiveCoursesShowMainCtrl'
                            }
                        }
                    })
                    //更多公告信息
                    .state('NoticInfo', {
                        url: '/NoticInfo',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.moreNoticInfo.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'message/message.moreNoticInfo.main.tpl.html',
                                controller: 'MoreNoticInfoCtrl'
                            }
                        }
                    })
                    //公告课程主页
                    .state('NoticInfo.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.moreNoticInfo.main.ctrl'])
                        },
                        views:{
                            'moreNoticInfo-manage': {
                                templateUrl: 'message/operation.html',
                                controller: 'MoreNoticInfoCtrl'
                            }
                        }
                    })
                    //个人信息设置
                    .state('PersonalInformation', {
                        url: '/PersonalInformation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.main.tpl.html',
                                controller: 'PersonalInformationCtrl'
                            }
                        }
                    })
                    //个人信息设置--我的资源
                    .state('PersonalInformation.resource', {
                        url: '/resource',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.resource.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.resource.tpl.html',
                                controller: 'PersonalInformationResourceCtrl'
                            }
                        }
                    })
                    //文档浏览--详细观看
                    .state('DocumentShow', {
                        url: '/DocumentShow',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['domShow/DocumentBrowsing.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'domShow/DocumentBrowsing.tpl.html',
                                controller: 'DocumentShowMainCtrl'
                            }
                        }
                    })
                    //个人信息设置--我的课表
                    .state('PersonalInformation.schedule', {
                        url: '/schedule',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.schedule.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.schedule.tpl.html',
                                controller: 'PersonalInformationScheduleCtrl'
                            }
                        }
                    })
                    //个人信息设置--我的课表详细介绍
                    .state('PersonalInformation.detail', {
                        url: '/detail',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/schedule/PersonalInformation.detailSchedule.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/schedule/PersonalInformation.detailSchedule.tpl.html',
                                controller: 'PersonalInformationDetailCtrl'
                            }
                        }
                    })
                    //个人信息设置--我的消息
                    .state('PersonalInformation.information', {
                        url: '/information',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.information.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.information.tpl.html',
                                controller: 'PersonalInformationCtrl'
                            }
                        }
                    })
                    //个人信息设置--个人设置
                    .state('PersonalInformation.personalset', {
                        url: '/personalset',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.personalset.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.personalset.tpl.html',
                                controller: 'PersonalSetCtrl'
                            }
                        }
                    })
                    //个人信息设置--视频加工
                    .state('PersonalInformation.videoset', {
                        url: '/videoset',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/PersonalInformation.videoSet.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/PersonalInformation.videoSet.tpl.html',
                                controller: 'videoSetCtrl'
                            }
                        }
                    })
                    //个人信息设置--视频打点
                    .state('PersonalInformation.videocutting', {
                        url: '/videocutting',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/video/PersonalVideo.videoCutting.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/video/PersonalVideo.videoCutting.tpl.html',
                                controller: 'videoCutCtrl'
                            }
                        }
                    })
                    //个人信息设置--视频打点
                    .state('PersonalInformation.videodotting', {
                        url: '/videodotting',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['PersonalInformation/video/PersonalVideo.videoDotting.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'PersonalInformation/video/PersonalVideo.videoDotting.tpl.html',
                                controller: 'videoDotCtrl'
                            }
                        }
                    })
                    //**全部
                    .state('excellentCourse.all', {
                        url: '/all',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.all.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.all.tpl.html',
                                controller: 'ExcellentCourseAllMainCtrl'
                            }
                        }
                    })
                    //**数学
                    .state('excellentCourse.math', {
                        url: '/math',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.math.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.math.tpl.html',
                                controller: 'ExcellentCourseMathMainCtrl'
                            }
                        }
                    })
                    //**语文
                    .state('excellentCourse.chinese', {
                        url: '/chinese',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.chinese.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.chinese.tpl.html',
                                controller: 'ExcellentCourseChineseMainCtrl'
                            }
                        }
                    })
                    //**英语
                    .state('excellentCourse.english', {
                        url: '/english',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.english.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.english.tpl.html',
                                controller: 'ExcellentCourseEnglishMainCtrl'
                            }
                        }
                    })
                    //**物理
                    .state('excellentCourse.physics', {
                        url: '/physics',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.physics.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.physics.tpl.html',
                                controller: 'ExcellentCoursePhysicsMainCtrl'
                            }
                        }
                    })
                    //**化学
                    .state('excellentCourse.chemistry', {
                        url: '/chemistry',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.chemistry.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.chemistry.tpl.html',
                                controller: 'ExcellentCourseChemistryMainCtrl'
                            }
                        }
                    })
                    //**生物
                    .state('excellentCourse.biology', {
                        url: '/biology',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.biology.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.biology.tpl.html',
                                controller: 'ExcellentCourseBiologyMainCtrl'
                            }
                        }
                    })
                    //**历史
                    .state('excellentCourse.history', {
                        url: '/history',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.history.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.history.tpl.html',
                                controller: 'ExcellentCourseHistoryMainCtrl'
                            }
                        }
                    })
                    //**地理
                    .state('excellentCourse.geography', {
                        url: '/geography',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.geography.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.geography.tpl.html',
                                controller: 'ExcellentCourseGeographyMainCtrl'
                            }
                        }
                    })
                    //**政治
                    .state('excellentCourse.political', {
                        url: '/political',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['excellentCourse/excellentCourse.political.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'excellentCourse/excellentCourse.political.tpl.html',
                                controller: 'ExcellentCoursePoliticalMainCtrl'
                            }
                        }
                    })

//                   资讯通告
                    .state('message', {
                        url: '/message',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.main.ctrl'])
                        },
                        views:{
                            'main': {
                                templateUrl: 'message/message.main.tpl.html',
                                controller: 'MessageMainCtrl'
                            }
                        }
                    })

                    //**全部
                    .state('message.all', {
                        url: '/all',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.all.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'message/message.all.tpl.html',
                                controller: 'MessageAllCtrl'
                            }
                        }
                    })
                    //**网站公告
                    .state('message.url', {
                        url: '/url',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.url.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'message/message.url.tpl.html',
                                controller: 'MessageUrlCtrl'
                            }
                        }
                    })
                    //**直播公告
                    .state('message.live', {
                        url: '/live',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['message/message.live.ctrl'])
                        },
                        views:{
                            'classroom-manage': {
                                templateUrl: 'message/message.live.tpl.html',
                                controller: 'MessageLiveCtrl'
                            }
                        }
                    })


                    //合同详情
                    //operation: view edit
                    .state('contracts.operation', {
                        url: '/:tmpContNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['contract/editor/contract.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'contract/editor/contract.editor.tpl.html',
                                controller: 'ContractEditorCtrl'
                            }
                        }
                    })


                    //临分业务（inquiry）
                    .state('inquiry', {
                        url: '/facings/:operations',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['inquiry/inquiry.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'inquiry/inquiry.list.tpl.html',
                                controller: 'InquiryListCtrl'
                            }
                        }
                    })

                    //分出查询
                    .state('fromquery', {
                        url: '/fromquerys/:bizType',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['fromquery/fromquery.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'fromquery/fromquery.list.tpl.html',
                                controller: 'FromQueryListCtrl',
                                controllerUrl: 'fromquery/fromquery.list.ctrl'
                            }
                        }
                    })


                    //临分账务（accounting）--1（分保），2（分批），3（分赔）
                    .state('accounting', {
                        url: '/facings/accounting/:bizType',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['accounting/accounting.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'accounting/accounting.list.tpl.html',
                                controller: 'AccountingListCtrl'
                            }
                        }
                    })

                    //立案查询
                    .state('claim', {
                        url: '/claims',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['claim/claim.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'claim/claim.list.tpl.html',
                                controller: 'ClaimListCtrl'
                            }
                        }
                    })

                    //险位分摊
                    .state('claim.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['claim/editor/claim.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'claim/editor/claim.editor.tpl.html',
                                controller: 'ClaimEditorCtrl'
                            }
                        }
                    })

                    //事故查询
                    .state('event', {
                        url: '/events',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['event/event.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'event/event.list.tpl.html',
                                controller: 'EventListCtrl'
                            }
                        }
                    })

                    //事故分摊
                    .state('event.operation', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['event/editor/event.share.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'event/editor/event.share.tpl.html',
                                controller: 'EventShareCtrl'
                            }
                        }
                    })

                    //理赔分摊（clmTms： 理赔次数）
                    .state('settle', {
                        url: '/settles/:certiNo/:certiType/:clmTms',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['settle/settle.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'settle/settles.list.tpl.html',
                                controller: 'SettleListCtrl'
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

                    //合同查询
                    .state('admin.contract', {
                        url: '/contracts/:contAttr/:mode',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['contract/contract.list.ctrl'])
                        },
                        views: {
                            admin: {
                                templateUrl: 'contract/contract.list.tpl.html',
                                controller: 'ContractListCtrl'
                            }
                        }
                    })

                    //查看(view)，编辑(edit)，复制(copy)，续转(transfer)，删除合同(delete)
                    .state('admin.contract.operation', {
                        url: '/:tmpContNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['contract/editor/contract.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'contract/editor/contract.editor.tpl.html',
                                controller: 'ContractEditorCtrl'
                            }
                        }
                    })

                    //新增(new)
                    .state('admin.contract.new', {
                        url: '/:inoutMrk/:contOutTyp/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['contract/editor/contract.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'contract/editor/contract.editor.tpl.html',
                                controller: 'ContractEditorCtrl'
                            }
                        }
                    })

                    //合同关系查询
                    .state('admin.relationship', {
                        url: '/relationships',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['relationship/relationship.list.ctrl'])
                        },
                        views: {
                            admin: {
                                templateUrl: 'relationship/relationship.list.tpl.html',
                                controller: 'RelationshipListCtrl'
                            }
                        }
                    })

                    //合同关系 查看(view)，编辑(edit),删除(delete)
                    .state('admin.relationship.operation', {
                        url: '/:relationshipNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['relationship/editor/relationship.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'relationship/editor/relationship.editor.tpl.html',
                                controller: 'RelationshipEditorCtrl'
                            }
                        },
                        onEnter:function(){
                        }

                    })

                    //合同关系 新增(new)
                    .state('admin.relationship.new', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['relationship/editor/relationship.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'relationship/editor/relationship.editor.tpl.html',
                                controller: 'RelationshipEditorCtrl'
                            }
                        },
                        onEnter:function(){
                        }

                    })

                    //再保人查询
                    .state('admin.reinsurer', {
                        url: '/reinsurers',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['reinsurer/reinsurer.list.ctrl'])
                        },
                        views: {
                            admin: {
                                templateUrl: 'reinsurer/reinsurer.list.tpl.html',
                                controller: 'ReinsurerListCtrl'
                            }
                        }
                    })

                    //再保人 查看(view)，编辑(edit),删除(delete)
                    .state('admin.reinsurer.operation', {
                        url: '/:reinsurerNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['reinsurer/editor/reinsurer.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'reinsurer/editor/reinsurer.editor.tpl.html',
                                controller: 'ReinsurerEditorCtrl'
                            }
                        }
                    })

                    //再保人 新建（new）
                    .state('admin.reinsurer.new', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['reinsurer/editor/reinsurer.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'reinsurer/editor/reinsurer.editor.tpl.html',
                                controller: 'ReinsurerEditorCtrl'
                            }
                        }
                    })

                    //自留额查询
                    .state('admin.retention', {
                        url: '/retentions',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['retention/retention.list.ctrl'])
                        },
                        views: {
                            admin: {
                                templateUrl: 'retention/retention.list.tpl.html',
                                controller: 'RetentionListCtrl'
                            }
                        }
                    })

                    //自留额 查看(view)，编辑(edit),删除(delete)
                    .state('admin.retention.operation', {
                        url: '/:retentionNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['retention/editor/retention.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'retention/editor/retention.editor.tpl.html',
                                controller: 'RetentionEditorCtrl'
                            }
                        }
                    })

                    //自留额 新增(new)
                    .state('admin.retention.new', {
                        url: '/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['retention/editor/retention.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'retention/editor/retention.editor.tpl.html',
                                controller: 'RetentionEditorCtrl'
                            }
                        }
                    })

                    //权限查询
                    .state('admin.authority', {
                        url: '/authorities',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['authority/authority.list.ctrl'])
                        },
                        views: {
                            admin: {
                                templateUrl: 'authority/authority.list.tpl.html',
                                controller: 'AuthorityListCtrl'
                            }
                        }
                    })
                    //权限操作
                    .state('admin.authority.operation', {
                        url: '/:authorityNo',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['authority/editor/authority.editor.ctrl'])
                        },
                        views: {
                            operation: {
                                templateUrl: 'authority/authority.editor.tpl.html',
                                controller: 'AuthorityEditorCtrl'
                            }
                        }
                    })
                ;
            }
        ]
    );
});