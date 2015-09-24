angular
    .module('fprApp')
    .controller('Feed', Feed);

Feed.$inject = ['wpService'];

function Feed(wpService) {
    var vm = this;

    vm.posts = [];
    vm.postLimit = 10;
    vm.noMoreResults = false;

    function initFeed() {
        if (!wpService.feed.length) {
            wpService.getFeed();
        }

        vm.posts = wpService.feed;
    }

    initFeed();
}