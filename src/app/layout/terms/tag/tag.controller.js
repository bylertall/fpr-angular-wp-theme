angular
    .module('fprApp')
    .controller('Tag', Tag);

Tag.$inject = ['wpService'];

function Tag(wpService) {
    var vm = this;

    vm.posts = wpService.postsByTag;
    vm.currentTagName = wpService.currentTagName;
    vm.currentTagSlug = wpService.currentTagSlug;
    vm.totalTagPosts = wpService.totalTagPosts;
    vm.showError = false;
    vm.noMoreResults = false;

    vm.getMorePosts = getMorePosts;

    if (vm.totalTagPosts === 0) {
        vm.showError = true;
    }

    function getMorePosts () {
        wpService.getPostsByTag(vm.currentTagSlug);

        if (wpService.currentTagPage > wpService.totalTagPages) {
            vm.noMoreResults = true;
        }
    }
}