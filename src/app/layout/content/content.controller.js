angular
    .module('fprApp')
    .controller('contentController', contentController);

contentController.$inject = ['$stateParams', 'wpService'];

function contentController($stateParams, wpService) {
    var vm = this;

    vm.contentLoaded = false;
    vm.rewardstyleId = 0;

    init().then(function() {
        vm.post = wpService.post;
        vm.categories = wpService.post.terms['category'];
        vm.tags = wpService.post.terms['post_tag'];
        vm.isFormatted = wpService.isFormatted;
        vm.oldFormatContent = wpService.trustedPostContent;
        vm.rewardstyleId = wpService.post.acf['rewardstyle_id'];
        vm.contentLoaded = true;
    });

    function init() {
        return wpService.getSinglePost($stateParams.slug);
    }
}
