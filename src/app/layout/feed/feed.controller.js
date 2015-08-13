angular
    .module('fprApp')
    .controller('Feed', Feed);

Feed.$inject = ['wpService'];

function Feed(wpService) {
    var vm = this;

    vm.posts = wpService.feed;
    vm.postLimit = 10;
    vm.noMoreResults = false;

    vm.getMoreFeed = function() {
        wpService.getFeed().then(function() {
            if (wpService.currentFeedPage >= wpService.totalFeedPages) {
                vm.noMoreResults = true;
            }
        });
    };
}