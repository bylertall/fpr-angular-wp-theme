(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Feed', Feed);

    Feed.$inject = ['WPService'];

    function Feed(WPService) {
        var vm = this;
        vm.posts = WPService.feed;
    }
})();