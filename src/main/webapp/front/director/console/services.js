define(['angular',
    'services/lemon.service.directorMain',
    'services/lemon.service.socket'

], function (angular) {
    angular.module('consoleDirector.service', [
       'lemon.service.directorMain',
       'lemon.service.socket'
    ]);
});