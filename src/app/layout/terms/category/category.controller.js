angular
    .module('fprApp')
    .controller('Category', Category);

Category.$inject = ['wpService'];

function Category(wpService) {
    var vm = this;

    vm.posts = wpService.postsByCategory;
    vm.currentCategoryName = wpService.currentCategoryName;
    vm.currentCategorySlug = wpService.currentCategorySlug;
    vm.totalCategoryPosts = wpService.totalCategoryPosts;
    vm.showError = false;
    vm.noMoreResults = false;

    vm.getMorePosts = getMorePosts;

    if (vm.totalCategoryPosts === 0) {
        vm.showError = true;
    }

    function getMorePosts () {
        wpService.getPostsByCategory(vm.currentCategorySlug);

        if (wpService.currentCategoryPage > wpService.totalCategoryPages) {
            vm.noMoreResults = true;
        }
    }
}