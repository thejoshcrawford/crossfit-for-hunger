(function () {
    'use strict';

    angular
        .module('app.leaderboard')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['$q', '$scope', '$firebaseArray', 'logger'];
    /* @ngInject */
    function LeaderboardController($q, $scope, $firebaseArray, logger) {
        var vm = this;
        vm.news = {
            title: 'The Moxie Games',
            description: "The Moxie Games is a Women's only CrossFit competition."
        };
        vm.messageCount = 0;
        vm.title = 'Leaderboard';

        activate();
        
        $scope.animateElementIn = function($el) {
            $el.removeClass('object-non-visible');
            $el.addClass('animated object-visible fadeIn'); // this example leverages animate.css classes 
        };
        
        $scope.animateElementOut = function($el) {};

        function activate() {
            var ref = new Firebase("https://boiling-fire-216.firebaseio.com/divisions");
            // download the data into a local object
            //var syncObject = $firebaseArray(ref);
            vm.divisions = $firebaseArray(ref);
            // synchronize the object with a three-way data binding
            // click on `index.html` above to see it used in the DOM!
            //syncObject.$bindTo(vm, "divisions");
            

            //return $q.all(promises).then(function () {
                logger.info('Activated Leaderboard View');
            //});
        }
    }
})();
