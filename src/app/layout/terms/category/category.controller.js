angular
    .module('fprApp')
    .controller('Category', Category);

Category.$inject = ['wpService'];

function Category(wpService) {
    var vm = this;

    vm.posts = wpService.postsByCategory;
    vm.numPosts = wpService.totalCategoryPosts;
    vm.currentCategoryName = wpService.currentCategoryName;
    vm.currentCategorySlug = wpService.currentCategorySlug;
    vm.showError = false;

    if (vm.numPosts === 0) {
        vm.showError = true;
    }
}