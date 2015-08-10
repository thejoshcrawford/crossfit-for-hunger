(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('topNav', topNav);

    /* @ngInject */
    function topNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/top-nav.html'
        };

        /* @ngInject */
        function TopNavController() {
            var vm = this;
        }

        return directive;
    }
})();
