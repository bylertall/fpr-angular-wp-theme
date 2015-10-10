angular
    .module('fprApp')
    .controller('Content', Content);

Content.$inject = ['$stateParams', 'wpService'];

function Content($stateParams, wpService) {
    var vm = this;

    vm.contentLoaded = false;

    init().then(function() {
        vm.post = wpService.post;
        vm.categories = wpService.post.terms['category'];
        vm.tags = wpService.post.terms['post_tag'];
        vm.isFormatted = wpService.isFormatted;
        vm.oldFormatContent = wpService.trustedPostContent;
        vm.rewardStyleId = wpService.post.acf['rewardstyle_id'];

        vm.contentLoaded = true;
    });

    function init() {
        return wpService.getSinglePost($stateParams.slug);
    }
}
