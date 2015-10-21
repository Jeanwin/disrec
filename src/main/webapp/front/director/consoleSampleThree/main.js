require.config({
//    baseUrl: '/director/consoleSample',
    baseUrl: '',
    urlArgs: 'v=beta1.0',
    paths: {
      /*  'jquery': '../../disrec/front/assets/js/lib/jquery-1.10.2.min',
        'angular': '../../disrec/front/assets/js/lib/angular.1.2.14.min',
        'ngIdle': '../../disrec/front/assets/js/lib/angular-idle',
        'locale-zh-cn': '../../disrec/front/assets/js/lib/angular-locale_zh-cn',
        'angular-ui-router': '../../disrec/front/assets/js/lib/angular-ui-router.min',
        'ngCookies': '../../disrec/front/assets/js/lib/angular-cookies.min',
        'uiBootstrap': '../../disrec/front/assets/js/lib/ui-bootstrap-0.10.0',
        'datepicker': '../../disrec/front/assets/js/lib/bootstrap-datepicker',
        'mcDatePicker': '../../disrec/front/common/directives/mc.datepicker',
        'menus': '../../disrec/front/common/configs/menus',
        'directorCtrl': '../../disrec/front/director/consoleSample/console.main.ctrl',
        'angular-animate'   : '../../disrec/front/assets/js/lib/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  '../../disrec/front/assets/js/lib/angular-couch-potato',
        'angularFileUpload'  : '../../disrec/front/assets/js/jquery.file.upload/jquery.fileupload-angular',
        'app': '../../disrec/front/director/consoleSample/app',
        'app-init': '../../disrec/front/director/consoleSample/app-init'*/

        'jquery': '../../assets/js/lib/jquery-1.10.2.min',
        'angular': '../../assets/js/lib/angular.1.2.14.min',
        'ngIdle': '../../assets/js/lib/angular-idle',
        'locale-zh-cn': '../../assets/js/lib/angular-locale_zh-cn',
        'angular-ui-router': '../../assets/js/lib/angular-ui-router.min',
        'ngCookies': '../../assets/js/lib/angular-cookies.min',
        'uiBootstrap': '../../assets/js/lib/ui-bootstrap-0.10.0',
        'datepicker': '../../assets/js/lib/bootstrap-datepicker',
        'mcDatePicker': '../../common/directives/mc.datepicker',
        'menus': '../../common/configs/menus',
        'directorCtrl': '../../director/consoleSample/console.main.ctrl',
        'angular-animate'   : '../../assets/js/lib/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  '../../assets/js/lib/angular-couch-potato',
        'angularFileUpload'  : '../../assets/js/jquery.file.upload/jquery.fileupload-angular',
        'angular-growl' : '../../assets/js/angular-growl/angular-growl',
        'app': '../../director/consoleSample/app',
        'app-init': '../../director/consoleSample/app-init',
        'config': '../../common/config'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'locale-zh-cn': {
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
        'angular-growl': {
            'deps'      : ['angular']
        },
        'angularTranslate': {
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
        'directorCtrl',
        'app'
    ],
    waitSeconds: 150
});

require([
    'jquery',
    'angular',
    'app-init',
    'directorCtrl',
     'app'
],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['console']);
            //关闭启动画面
            $('.splash-window').remove();
        });
    }
);