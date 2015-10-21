define(['angular',

    'common/services/lemon.service.code',
    'common/services/lemon.service.security',
    'common/services/lemon.service.classroom',
    'common/services/lemon.service.facility',
    'common/services/lemon.service.main',
    'common/services/lemon.service.director',
    'common/services/lemon.service.resource',
    'common/services/lemon.service.portal',
    'common/services/lemon.service.system',
    'common/services/lemon.service.schedule',
    'common/services/lemon.service.course',
    'common/services/lemon.service.daily',
    'common/services/lemon.service.information',
    'common/services/lemon.service.informationSent',
    'common/services/lemon.service.tactics',
    'common/services/lemon.service.permission',
    'common/services/lemon.service.socket',
    'common/services/lemon.service.teachSearch',
	'common/services/lemon.service.websocketLog',
    'common/services/lemon.service.logsStatics',
    'common/services/lemon.service.message'

], function (angular) {
    angular.module('lemon.service', [
        'lemon.service.code',
        'lemon.service.security',
        'lemon.service.classrooom',
        'lemon.service.facility',
        'lemon.service.main',
        'lemon.service.director',
        'lemon.service.resource',
        'lemon.service.portal',
        'lemon.service.system',
        'lemon.service.schedule',
        'lemon.service.course',
        'lemon.service.daily',
        'lemon.service.information',
        'lemon.service.informationSent',
        'lemon.service.tactics',
        'lemon.service.permission',
        'lemon.service.socket',
        'lemon.service.teachSearch',
		'lemon.service.websocketLog',
        'lemon.service.logsStatics',
        'lemon.service.message'
    ]);
});