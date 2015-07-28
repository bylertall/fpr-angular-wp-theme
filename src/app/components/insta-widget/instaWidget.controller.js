(function() {
    'use strict';

    angular
        .module('fprApp')
        .controller('InstaWidget', InstaWidget);

    InstaWidget.$inject = ['InstaService'];

    function InstaWidget(InstaService) {
        var vm = this;

        vm.feed = InstaService.feed;
    }
})();