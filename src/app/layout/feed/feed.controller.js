angular
    .module('fprApp')
    .controller('feedController', feedController);

feedController.$inject = ['$window', '$sce', 'wpService'];

function feedController($window, $sce, wpService) {
    var vm = this;

    vm.posts = [];
    vm.postLimit = 10;
    vm.noMoreResults = false;
    vm.rsWidget = {
        activeId: 0,
        toggle: toggleWidget
    };
    vm.trustPostContent = trustPostContent;

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
        vm.rsWidget.activeId = (vm.rsWidget.activeId === id) ? 0 : id;
    }
}
