(function() {
    'use strict';

    angular
        .module('app.leaderboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'leaderboard',
                config: {
                    url: '/',
                    templateUrl: 'app/leaderboard/leaderboard.html',
                    controller: 'LeaderboardController',
                    controllerAs: 'vm',
                    title: 'leaderboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home"></i> Leaderboard'
                    }
                }
            }
        ];
    }
})();
