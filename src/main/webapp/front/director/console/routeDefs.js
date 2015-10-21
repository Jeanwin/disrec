define(['app'
    ], function(app) {
    app.registerProvider(
        'routeDefs',
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$couchPotatoProvider',
            '$locationProvider',
            '$provide',
            function (
                $stateProvider,
                $urlRouterProvider,
                $couchPotatoProvider
                ) {

                this.$get = function() {
                    // this is a config-time-only provider
                    // in a future sample it will expose runtime information to the app
                    return {};
                };

                $urlRouterProvider
                    .when('', '/');

                $urlRouterProvider.otherwise('/dashboard');

            }
        ]
    );
});