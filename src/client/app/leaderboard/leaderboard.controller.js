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
                var overallEvent = {scores: [], name: 'overall', measure: 'overall', sort: 'ascending'};
                division.events = division.events.filter(function(event){
                    if (event.name === 'overall') return false;
                    return true;
                });
                
                division.events.forEach(function(event){
                    event.scores.sort(function(a, b){
                        var equality = 0;
                        if (a.value < b.value) equality = -1;
                        if (a.value > b.value) equality = 1;
                        
                        if (event.sort === 'ascending') equality *= -1;
                        
                        return equality;
                    });
                    
                    event.scores.forEach(function(score, index, array){                 
                        var overallIndex = overallEvent.scores
                            .map(function(score) {return score.athleteName; })
                            .indexOf(score.athleteName);
                            
                        if (overallIndex === -1) {
                            overallEvent.scores.push({athleteName: score.athleteName, value: index+1});
                        } else {
                            overallEvent.scores[overallIndex].value += index+1;
                        }
                    });
                });            
                division.events.push(overallEvent);
            });
        }
    }
})();
