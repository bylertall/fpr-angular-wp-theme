angular
    .module('fprApp')
    .controller('Tag', Tag);

Tag.$inject = ['wpService'];

function Tag(wpService) {
    var vm = this;

    vm.posts = wpService.postsByTag;
    console.log(wpService.postsByTag);

    vm.currentTag = wpService.currentTagName;
}