(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', '$scope', 'dataservice', 'logger'];
    /* @ngInject */
    function HomeController($q, $scope, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'The Moxie Games',
            description: "The Moxie Games is a Women's only CrossFit competition."
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Home';

        activate();
        
        $scope.animateElementIn = function($el) {
            $el.removeClass('object-non-visible');
            $el.addClass('animated object-visible fadeIn'); // this example leverages animate.css classes 
        };
        
        $scope.animateElementOut = function($el) {};

        function activate() {
            var promises = [getMessageCount(), getPeople()];

            // Fixed header
            //-----------------------------------------------
            $(window).scroll(function () {
                if (($('.header.fixed').length > 0)) {
                    if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                        $('body').addClass('fixed-header-on');
                    } else {
                        $('body').removeClass('fixed-header-on');
                    }
                };
            });

            $(window).load(function () {
                if (($('.header.fixed').length > 0)) {
                    if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                        $('body').addClass('fixed-header-on');
                    } else {
                        $('body').removeClass('fixed-header-on');
                    }
                };
            });

            return $q.all(promises).then(function () {
                logger.info('Activated Home View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
