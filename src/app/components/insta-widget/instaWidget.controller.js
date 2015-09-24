angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['$scope', 'instaService'];

function InstaWidget($scope, instaService) {
    var vm = this;

    // header is set to show 6 tiles (most recent)
    if ($scope.tileCount == 6) {
        vm.feed = instaService.feed;
    } else {

        // for bottom widget (set to different tileCount)
        // show remaining photos (do not include ones shown at the top)
        vm.feed = instaService.feed.slice(6);
    }

    function initFeed() {
        if (!instaService.feed.length) {
            instaService.getInstaFeed().then(function(res) {
                vm.feed = instaService.feed;
            });
        }
    }

    initFeed();
}