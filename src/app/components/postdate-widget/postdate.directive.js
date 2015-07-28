(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprPostDate', fprPostDate);

    function fprPostDate() {
        var directive = {
            scope: {
                postDate: '@'
            },
            templateUrl: WPAPI.partials_url + 'post-date-widget.html'
        };

        return directive;
    }
})();