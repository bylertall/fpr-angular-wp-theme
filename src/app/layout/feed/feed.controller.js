angular
    .module('fprApp')
    .controller('Feed', Feed);

Feed.$inject = ['$window', '$sce', 'wpService'];

function Feed($window, $sce, wpService) {
    var vm = this;

    vm.posts = [];
    vm.postLimit = 10;
    vm.noMoreResults = false;
    vm.activeWidget = 0;
    vm.trustPostContent = trustPostContent;
    vm.toggleWidget = toggleWidget;

    init();

    function init() {
        if (!wpService.feed.length) {
            getFeed();
        } else {
            vm.posts = wpService.feed;
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

    function trustPostContent(content) {
        return $sce.trustAsHtml(content);
    }

    function toggleWidget(id) {
        var window = angular.element($window),
            timer;

        vm.activeWidget = vm.activeWidget === id ? 0 : id;
    }
}
