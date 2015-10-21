define(['angular',
    '../consoleSample/services/lemon.service.directorMain',
    '../consoleSample/services/lemon.service.socket',
    '../../common/services/lemon.service.permission',
    

], function (angular) {
    angular.module('consoleDirector.service', [
       'lemon.service.directorMain',
       'lemon.service.socket',
       'lemon.service.permission',
    ]);
});