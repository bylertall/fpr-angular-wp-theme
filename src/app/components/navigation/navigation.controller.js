angular
    .module('fprApp')
    .controller('NavigationController', NavigationController);

NavigationController.$inject = ['$modal'];
function NavigationController($modal) {
    var vm = this,
        mobileMenu = $modal({
            templateUrl: 'components/navigation/mobileMenu.modal.html',
            container: 'body',
            keyboard: true,
            show: false
        });

    vm.showMenuModal = function() {
        mobileMenu.$promise.then(mobileMenu.show);
    };
}