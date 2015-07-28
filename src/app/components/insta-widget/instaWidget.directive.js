(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprInstaWidget', fprInstaWidget);

    function fprInstaWidget() {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'InstaWidget as insta',
            templateUrl: WPAPI.partials_url + 'insta-widget.html'
        }
    }
})();