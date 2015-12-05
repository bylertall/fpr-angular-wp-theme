angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['$scope', 'instaService'];

function InstaWidget($scope, instaService) {
    var vm = this;

    if (+vm.tileCount === 6) {
        init();
    }

    $scope.$on('instafeedLoaded', function() {
        if (+vm.tileCount === 6) {
            vm.feed = instaService.feed;
        } else {
            // for bottom widget (set to different tileCount)
            // show remaining photos (do not include ones shown at the top)
            vm.feed = instaService.feed.slice(6);
        }
    });

    // TODO: use lodash to get collection and merge to current collection on state change
    // if (+vm.tileCount === 6) {
    //     $scope.$on('$stateChangeStart', function() {
    //          TODO: instaService.getFreshFeed
    //          getFreshFeed should make another get request, find way to compare/merge new feed w/ old
    //     });
    // }

    function init() {
        return instaService.getInstaFeed();
    }
}
