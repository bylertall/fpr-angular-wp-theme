angular
    .module('fprApp')
    .controller('tagController', tagController);

tagController.$inject = ['wpService'];

function tagController(wpService) {
    var vm = this;

    vm.posts = wpService.postsByTag;
    vm.numPosts = wpService.totalTagPosts;
    vm.currentTagName = wpService.currentTagName;
    vm.currentTagSlug = wpService.currentTagSlug;
    vm.showError = false;

    if (vm.numPosts === 0) {
        vm.showError = true;
    }
}
