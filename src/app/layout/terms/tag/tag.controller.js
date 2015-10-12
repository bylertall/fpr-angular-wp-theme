angular
    .module('fprApp')
    .controller('tagController', tagController);

tagController.$inject = ['$stateParams', 'wpService'];

function tagController($stateParams, wpService) {
    var vm = this;

    init().then(function() {
        vm.posts = wpService.postsByTag;
        vm.numPosts = wpService.totalTagPosts;
        vm.currentTagName = wpService.currentTagName;
        vm.currentTagSlug = wpService.currentTagSlug;
        vm.showError = false;

        if (vm.numPosts === 0) {
            vm.showError = true;
        }
    });

    function init() {
        return wpService.getPostsByTag($stateParams.tag);
    }
}
