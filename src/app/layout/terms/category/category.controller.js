angular
    .module('fprApp')
    .controller('Category', Category);

Category.$inject = ['wpService'];

function Category(wpService) {
    var vm = this;

    vm.posts = wpService.postsByCategory;
    console.log(wpService.postsByCategory);

    vm.currentCategory = wpService.currentCategoryName;
}