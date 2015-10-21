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
        'datetimepicker':'assets/js/lib/bootstrap-datetimepicker',
        'mcDatePicker': '../../disrec/front/common/directives/mc.datepicker',        
        'rt.popup': 'assets/js/angular-rt-popup/angular-rt-popup.min',
        'moment': 'assets/js/moment/moment-with-locales',
        'fullCalendar': 'assets/js/full-calendar/fullcalendar.min',
        'ui.calendar': 'assets/js/ui-calendar/calendar',
        'mainCtrl': 'common/controllers/main.ctrl',
        'directorSeize': 'common/controllers/director_seize',
        'angular-animate'   : 'assets/js/lib/angular-animate.1.2.14.min',
        'angular-growl' : 'assets/js/angular-growl/angular-growl',
        'angular-couch-potato'  :  'assets/js/lib/angular-couch-potato',
        'angular-toggle-switch' : 'assets/js/angular-toggle-switch/angular-toggle-switch.min',
        'angularFileUpload'  : 'assets/js/angular-file-upload/angular-file-upload.min',
        'slick'  : 'assets/js/slick/slick.min',
        'ui-tree':'assets/js/lib/angular-ui-tree.min',
        'viewport':'assets/js/viewport',
        'coursepatorlmain':'assets/js/coursepatorlmain',
        'displayVideos':'assets/js/displayVideos',
        'optionsJS':'assets/js/optionsJS',
        'mc-lemon': 'common/mc.lemon.1.0.0',
        'app': 'common/app',
        'app-init': 'common/app-init',
        'services': 'common/services/services',
        'config': 'common/config',
        'filters': 'common/filters',
        'codes': 'common/codes',
        'error': 'common/error',
        'PolyfillLoader': 'common/PolyfillLoader',
        'routeDefs': 'common/routeDefs',
        'uiSelect2': 'assets/js/ui-select/select2',
        'uiSelect2Module': 'assets/js/ui-select/angular-ui-select2/select2',
        'focusMe': 'common/directives/focusMe',
        'bootstrap': 'assets/js/lib/bootstrap',
        'bootstrap-dropdown': 'assets/js/bootstrap-dropdown',
        'bootstrap-button': 'assets/js/bootstrap-button',
        'bootstrap-collapse': 'assets/js/bootstrap-collapse',
        'Chartjs':'assets/js/lib/Chart',
        'angularChart':'assets/js/lib/angular-chart'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'locale-zh-cn': {
            'deps'    : ['angular']
        },
        'fullCalendar': {
            'deps'    : ['moment']
        },
        'ui.calendar': {
            'deps'    : ['angular', 'fullCalendar']
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
        'angular-toggle-switch': {
            'deps'    : ['angular']
        },
        'uiBootstrap': {
            'exports': 'uiBootstrap'
        },
        'ui-tree': {
            'deps'     : ['angular']
        },
        'angularChart': {
            'deps'     : ['angular']
        },
        'angularChart': {
            'deps'     : ['Chartjs']
        },
        'rt.popup': {
            'deps' : ['angular']
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
    'uiSelect2',
    'viewport',
    'coursepatorlmain',
    'bootstrap',
    'bootstrap-collapse',
    'bootstrap-button',
    'optionsJS',
    'bootstrap-dropdown'
],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
        	//获取index.html中的html节点，加载lemon这个app
            angular.bootstrap($('#ng-app'), ['lemon']);
            //关闭启动画面
            $('.splash-window').remove();
        });
    }
);