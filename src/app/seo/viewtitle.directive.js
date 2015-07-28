(function() {
    'use strict';

    angular
        .module('fprApp')
        .directive('fprPageTitle', fprPageTitle);

    function fprPageTitle() {
        var directive = {
            restrict: 'EA',
            link: link
        };

        return directive;
    }

    function link(scope, elem, attrs) {
        var title = document.querySelector('title'),
            defaultTitle = "The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata";

        if (attrs.pageTitle) {
            return title.innerHTML = attrs.pageTitle + ' | The Fancy Pants Report';
        }
        return title.innerHTML = defaultTitle;
    }
})();