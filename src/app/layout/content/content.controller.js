angular
    .module('fprApp')
    .controller('Content', Content);

Content.$inject = ['wpService'];

function Content(wpService) {
    var vm = this;

    vm.post = wpService.post;
    vm.categories = wpService.post.terms['category'];
    vm.tags = wpService.post.terms['post_tag'];

    vm.isFormatted = wpService.isFormatted;
    vm.oldFormatContent = wpService.trustedPostContent;
}
