(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('Content', Content);

    Content.$inject = ['WPService'];

    function Content(WPService) {
        var vm = this;

        vm.post = WPService.post;
        vm.categories = WPService.post.terms['category'];
        vm.tags = WPService.post.terms['post_tag'];

        vm.isFormatted = WPService.isFormatted;
        vm.oldFormatContent = WPService.trustedPostContent;
    }
})();