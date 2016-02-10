angular
  .module('fprApp')
  .controller('rewardstyleController', rewardstyleController);

rewardstyleController.$inject = ['$window', '$timeout'];

function rewardstyleController($window, $timeout) {
    var vm = this,
        window = angular.element($window),
        stp = window[0].__stp;

    // initialize rs widget
    $timeout(function() {
        stp.init();
    }, 0);
}
