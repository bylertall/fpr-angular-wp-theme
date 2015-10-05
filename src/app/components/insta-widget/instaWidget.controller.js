angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['instaService'];

function InstaWidget(instaService) {
    var vm = this;

    vm.feed = [];

    if (!instaService.feed.length) {
        init().then(function () {
            console.log('The tile count is: ' + vm.tileCount + '. And the type is: ' + (typeof +vm.tileCount));
            // header is set to show 6 tiles (most recent)
            if (+vm.tileCount === 6) {
                vm.feed = instaService.feed;
            } else {
                // for bottom widget (set to different tileCount)
                // show remaining photos (do not include ones shown at the top)
                vm.feed = instaService.feed.slice(6);
            }
        });
    }

    function init() {
        return instaService.getInstaFeed();
    }
}
