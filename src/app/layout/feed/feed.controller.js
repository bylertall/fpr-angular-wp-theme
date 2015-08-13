angular
    .module('fprApp')
    .controller('Feed', Feed);

Feed.$inject = ['wpService'];

function Feed(wpService) {
    var vm = this;

    vm.posts = wpService.feed;
    vm.getMoreFeed = wpService.getMoreFeed;
}

