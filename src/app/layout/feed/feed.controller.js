angular
    .module('fprApp')
    .controller('Feed', Feed);

Feed.$inject = ['$timeout', 'wpService'];

function Feed($timeout, wpService) {
    var vm = this;

    vm.posts = [];
    vm.postLimit = 10;
    vm.noMoreResults = false;
    vm.activeWidget = 0;
    vm.toggleWidget = toggleWidget;

    init();

    function init() {
        if (!wpService.feed.length) {
            return getFeed();
        } else {
            return vm.posts = wpService.feed;
        }
    }

    function getFeed() {
        return wpService.getFeed()
            .then(function() {
                vm.posts = wpService.feed;
                return vm.posts;
            }, function() {
                console.log('Unable to fetch recent posts!');
            });
    }

    function toggleWidget(id) {
        vm.activeWidget = vm.activeWidget === id ? 0 : id;
    }
}