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
    vm.noMoreResults = false;

    vm.getMorePosts = function () {
        wpService.getPostsByCategory(vm.currentCategorySlug);

        if (wpService.currentCategoryPage >= wpService.totalCategoryPages) {
            vm.noMoreResults = true;
        }
    };
}