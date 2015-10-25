(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'blocks.exception',
            'blocks.logger', 
            'blocks.router',
            'ui.router', 
            'firebase'
        ]);
})();
