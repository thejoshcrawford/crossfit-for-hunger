(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$q', '$scope', '$firebaseArray', 'logger'];
    /* @ngInject */
    function AdminController($q, $scope, $firebaseArray, logger) {
        var vm = this;
        vm.messageCount = 0;
        vm.title = 'Admin';
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
        
        vm.saveScore = function(division){
            vm.divisions.$save(division).then(function(){
                
            });
        }
    }
})();
