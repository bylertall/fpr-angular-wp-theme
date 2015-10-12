angular
    .module('fprApp')
    .controller('categoryController', categoryController);

categoryController.$inject = ['$stateParams', 'wpService'];

function categoryController($stateParams, wpService) {
    var vm = this;

    init().then(function() {
        vm.posts = wpService.postsByCategory;
        vm.numPosts = wpService.totalCategoryPosts;
        vm.currentCategoryName = wpService.currentCategoryName;
        vm.currentCategorySlug = wpService.currentCategorySlug;
        vm.showError = false;

        // show no posts error if no posts are found for the category
        if (vm.numPosts === 0) {
            vm.showError = true;
        }
    });

    function init() {
        return wpService.getPostsByCategory($stateParams.category);
    }
}
