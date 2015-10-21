define([
    'jquery',
    'angular',
    'angular-couch-potato',
    'locale-zh-cn',
    'angular-animate',
    'angular-ui-router',
    'ngCookies',
    'uiBootstrap',
    'datepicker',
    'mcDatePicker',
    'services',
    'ngIdle'
    ], function ($, angular, couchPotato) {

        'use strict';

        var app = angular.module('console', [
                    'scs.couch-potato',
                    'ngLocale',
                    'ngAnimate',
                    'ui.router',
                    'ngCookies',
                    'ui.bootstrap',
                    'mc.datepicker',
                    'consoleDirector.service',
                    'ngIdle'
        ]);

    couchPotato.configureApp(app);
    return app;
});