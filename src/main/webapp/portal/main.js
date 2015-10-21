require.config({
    baseUrl: '',
    urlArgs: 'v=beta1.0',
    paths: {
        'jquery': 'assets/js/lib/jquery-1.10.2.min',
        'angular': 'assets/js/lib/angular.1.2.14.min',
        'ngIdle': 'assets/js/lib/angular-idle',
        'locale-zh-cn': 'assets/js/lib/angular-locale_zh-cn',
        'angularTranslate': 'assets/js/lib/angular-translate.min',
        'angular-ui-router': 'assets/js/lib/angular-ui-router.min',
        'ngCookies': 'assets/js/lib/angular-cookies.min',
        'uiBootstrap': 'assets/js/lib/ui-bootstrap-0.10.0',
        'datepicker': 'assets/js/lib/bootstrap-datepicker',
        'mcDatePicker': 'common/directives/mc.datepicker',
        'menus': 'common/configs/menus',
        'mainCtrl': 'common/controllers/main.ctrl',
        'angular-growl' : 'assets/js/angular-growl/angular-growl',
        'angular-animate'   : 'assets/js/lib/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  'assets/js/lib/angular-couch-potato',
        'angular-toggle-switch' : 'assets/js/angular-toggle-switch/angular-toggle-switch.min',
        'angupoly': 'assets/js/lib/angupoly',
        'angularFileUpload'  : 'assets/js/angular-file-upload/angular-file-upload.min',
//        'angularFileUpload'  : 'assets/js/jquery.file.upload/jquery.fileupload-angular',
        'PolyfillLoader': 'common/PolyfillLoader',
        'ui-tree':'assets/js/lib/angular-ui-tree.min',
        'uiSelect2': 'assets/js/ui-select/select2',
        'uiSelect2Module': 'assets/js/ui-select/angular-ui-select2/select2',
        'bootstrapJs': 'assets/js/bootstrap.min',
        'respondIe8':'assets/js/respond',
        'responsivenavtitle':'assets/js/responsive-nav.min',
		'videocontrolor':'assets/js/videoCO',
		'videCutcontrolor':'assets/js/videoCut'       
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'locale-zh-cn': {
            'deps'    : ['angular']
        },
        'angupoly': {
            'deps'    : ['angular']
        },
        'ngIdle': {
            'deps'    : ['angular']
        },
        'angular-ui-router': {
            'deps'    : ['angular']
        },
        'angular-animate': {
            'deps'    : ['angular']
        },
        'angularTranslate': {
            'deps'    : ['angular']
        },
        'angular-toggle-switch': {
            'deps'    : ['angular']
        },
//        'angularFileUpload': {
//            'deps'     : ['angular']
//        },
        'angular-growl': {
            'deps'     : ['angular']
        },
        'uiSelect2': {
            'deps'    : ['angular']
        },
        'ui-tree': {
            'deps'    : ['angular']
        },
        'uiBootstrap': {
            'exports': 'uiBootstrap'
        }
    },
    priority: [
        'jquery',
        'angular',
        'app-init',
        'mainCtrl'
    ],
    waitSeconds: 150
});

require([
        'jquery',
        'angular',
        'app-init',
        'mainCtrl',
        'ui-tree',
        'uiSelect2',
        'bootstrapJs',
        'respondIe8',
        'videocontrolor',
		'videCutcontrolor',
        'responsivenavtitle'
    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['olive']);
            //关闭启动画面
            $('.splash-window').remove();
        });
    }
);