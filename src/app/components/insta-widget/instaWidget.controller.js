angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['$scope', 'instaService'];

function InstaWidget($scope, instaService) {
    var vm = this;

    $scope.$on('$stateChangeStart', function() {
        if (+vm.tileCount === 6) {
            init();
        }
    });

    $scope.$on('instafeedLoaded', function() {
        if (+vm.tileCount === 6) {
            vm.feed = instaService.feed;
        } else {
            // for bottom widget (set to different tileCount)
            // show remaining photos (do not include ones shown at the top)
            vm.feed = instaService.feed.slice(6);
        }
    });
    //
    // init().then(function () {
    //     // header is set to show 6 tiles (most recent)
    //     if (+vm.tileCount === 6) {
    //         vm.feed = instaService.feed;
    //     } else {
    //         // for bottom widget (set to different tileCount)
    //         // show remaining photos (do not include ones shown at the top)
    //         vm.feed = instaService.feed.slice(6);
    //     }
    // });

    function init() {
        return instaService.getInstaFeed();
    }
}
