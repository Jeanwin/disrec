define(['angular',

    'services/lemon.service.code',
    'services/olive.service.security',

    'services/lemon.service.course',
    'services/lemon.service.live',
    'services/lemon.service.tree',
    'services/lemon.service.anchorScroll'
], function (angular) {
    angular.module('olive.service', [
        'lemon.service.code',
        'olive.service.security',

        'lemon.service.course',
        'lemon.service.live',
        'lemon.service.tree',
        'lemon.service.AnchorScroll'
    ]);
});