angular
    .module('fprApp')
    .controller('InstaWidget', InstaWidget);

InstaWidget.$inject = ['instaService'];

function InstaWidget(instaService) {
    var vm = this;

    vm.feed = instaService.feed;
}