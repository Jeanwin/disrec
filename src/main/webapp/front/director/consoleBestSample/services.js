define(['angular',
    '../consoleSample/services/lemon.service.directorMain',
    '../consoleSample/services/lemon.service.socket'

], function (angular) {
    angular.module('consoleDirector.service', [
       'lemon.service.directorMain',
       'lemon.service.socket'
    ]);
});