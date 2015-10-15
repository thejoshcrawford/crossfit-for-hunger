(function () {
    'use strict';

    angular
        .module('app.leaderboard')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['$q', '$scope', '$firebaseArray', 'logger'];
    /* @ngInject */
    function LeaderboardController($q, $scope, $firebaseArray, logger) {
        var vm = this;
        vm.messageCount = 0;
        vm.title = 'Leaderboard';
        vm.selectedDivision = null;
        vm.selectedEvent = 'total';
        
        var ref = new Firebase("https://boiling-fire-216.firebaseio.com/divisions");
        vm.divisions = $firebaseArray(ref);
        vm.divisions.$loaded(function (divisions) {
            vm.selectedDivision = divisions[0].name;
        });
        
        vm.showDivision = function(divisionName){
            vm.selectedDivision = divisionName;
        }
        
        vm.showEvent = function(eventName){
            vm.selectedEvent = eventName;
        }
    }
})();
