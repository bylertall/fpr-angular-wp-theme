angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['$scope', 'instaService'];

function InstaWidget($scope, instaService) {
    var vm = this;

    vm.feed = [];

    init().then(function(res) {
        // header is set to show 6 tiles (most recent)
        if ($scope.tileCount == 6) {
            vm.feed = instaService.feed;
        } else {

            // for bottom widget (set to different tileCount)
            // show remaining photos (do not include ones shown at the top)
            vm.feed = instaService.feed.slice(6);
        }
    });

    function init() {
        if (!instaService.feed.length) {
            return instaService.getInstaFeed();
        }
    }
}