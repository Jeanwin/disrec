define([
    'jquery',
    'angular',
    'angular-couch-potato',
    'mc-lemon',
    'locale-zh-cn',
    'angular-animate',
    'angular-growl',
    'angularTranslate',
    'angular-ui-router',
    'ngCookies',
    'uiBootstrap',
    'datepicker',
    'datetimepicker',
    'mcDatePicker',
    'services',
    'angular-toggle-switch',
    'angularFileUpload',
    'ui-tree',
    'ui.calendar',
    'rt.popup',
    'ngIdle',
    'uiSelect2Module',
    'optionsJS',
    'Chartjs',
    'angularChart'
    ], function ($, angular, couchPotato) {

        'use strict';

        var app = angular.module('lemon', [
                    'scs.couch-potato',
                    'mc.lemon',
                    'ngLocale',
                    'ngAnimate',
                    'angular-growl',
                    'pascalprecht.translate',
                    'ui.router',
                    'ngCookies',
                    'ui.bootstrap',
                    'mc.datepicker',
                    'lemon.service',
                    'toggle-switch',
                    'angularFileUpload',
                    'ui.tree',
                    'ui.calendar',
                    'rt.popup',
                    'ngIdle',
                    'ui.select2',
                    'ie.select',
                    'chart.js'
        ]);

    couchPotato.configureApp(app);


    return app;
});