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
        vm.updateCount = 0
        vm.updatedDivision = -1;
        
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
        
        function buildOverall(object){
            // if (vm.updateCounts === null) {
            //     vm.updateCounts = new Array(vm.divisions.length);
            // }
            vm.divisions.forEach(function(division, divisionIndex){
                var overallEvent = {scores: [], name: 'overall', measure: 'overall', sort: 'ascending'};
                division.events = division.events.filter(function(event){
                    if (event.name === 'overall') return false;
                    return true;
                });
                
                division.events.forEach(function(event){                    
                    event.scores.sort(function(a, b){
                        
                        var equality = a.value - b.value;
                        
                        if (a.value === 0 && b.value !== 0) return 1; 
                        if (b.value === 0 && a.value !== 0) return -1;                       
                        
                        if (event.sort === 'descending') equality *= -1;
                        
                        return equality;
                    });
                    
                    event.scores.forEach(function(score){                 
                        score.rank = event.scores
                            .map(function(s) {return s.value; })
                            .indexOf(score.value)+1;
                    });
                    
                    event.scores.forEach(function(score, index, array){                 
                        var overallIndex = overallEvent.scores
                            .map(function(oeScore) {return oeScore.athleteName; })
                            .indexOf(score.athleteName);
                            
                        if (overallIndex === -1) {
                            overallEvent.scores.push({athleteName: score.athleteName, value: score.rank});
                        } else {
                            overallEvent.scores[overallIndex].value += score.rank;
                        }
                    });
                });   
                overallEvent.scores.sort(function(a, b){
                    var equality = a.value - b.value;
                        
                    if (a.value === 0 && b.value !== 0) return 1; 
                    if (b.value === 0 && a.value !== 0) return -1;
                    
                    return equality;
                });  
                overallEvent.scores.forEach(function(score){                 
                        score.rank = overallEvent.scores
                            .map(function(s) {return s.value; })
                            .indexOf(score.value)+1;
                    });    
                division.events.push(overallEvent);  
                // if (vm.updateCounts[divisionIndex] === undefined) {
                //     vm.updateCounts[divisionIndex] = -1; // first one doesn't count
                // } 
                // vm.updateCounts[divisionIndex] += 1;              
            });
            
            vm.updateCount++;
            if(vm.updateCount > vm.divisions.length){
                vm.updatedDivision = object.key;
            }            
        }
    }
})();
