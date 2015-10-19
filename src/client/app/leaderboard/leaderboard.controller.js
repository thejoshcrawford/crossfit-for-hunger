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
        vm.selectedEvent = 'overall';
        
        var ref = new Firebase("https://boiling-fire-216.firebaseio.com/divisions");
        vm.divisions = $firebaseArray(ref);
        vm.divisions.$loaded(function (divisions) {
            vm.selectedDivision = divisions[0].name;
            //buildOverall();
        });
        vm.divisions.$watch(buildOverall);
        
        vm.showDivision = function(divisionName){
            vm.selectedDivision = divisionName;
        }
        
        vm.showEvent = function(eventName){
            vm.selectedEvent = eventName;
        }
        
        function buildOverall(){
            vm.divisions.forEach(function(division){
                var overallEvent = {scores: [], name: 'overall'};
                division.events.forEach(function(event){
                    event.scores.forEach(function(score){
                        var isUpdated = false;
                        overallEvent.scores.forEach(function(overallEventScore){
                            if (overallEventScore.athleteName === score.athleteName) {
                                overallEventScore.value += score.value;
                                isUpdated = true;
                            }
                        });
                        
                        if (!isUpdated){
                            var overallEventScore = {athleteName: score.athleteName, value: score.value}
                            overallEvent.scores.push(overallEventScore);
                        }
                    })
                })
                division.events = division.events.filter(function(event){
                    if (event.name === 'overall') return false;
                    return true;
                });
                division.events.push(overallEvent);
            })
        }
    }
})();
