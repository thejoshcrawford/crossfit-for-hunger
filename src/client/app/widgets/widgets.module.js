(function () {
    'use strict';

    angular.module('app.widgets', []);
})();

(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('blink', function ($animate, $timeout) {
            return {
                scope: {
                    shouldBlink: '=blink',
                    blinkWatch: '=blinkWatch'
                },
                link: function (scope, element) {
                    scope.$watch('blinkWatch', function () {
                        if (scope.shouldBlink) {
                            $animate.addClass(element, 'blink', scope.afterHide);                        
                            $timeout(function () {
                                $animate.removeClass(element, 'blink');   
                            }, 1000);                      
                        }
                    });
                }
            }

        })
})();