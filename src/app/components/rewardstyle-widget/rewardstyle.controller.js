angular
  .module('fprApp')
  .controller('rewardstyleController', rewardstyleController);

rewardstyleController.$inject = ['$window', '$timeout'];

function rewardstyleController($window, $timeout) {
    var vm = this,
        window = angular.element($window),
        stp = window[0].__stp,
        timer;

    if (timer) {
        $timeout.cancel(timer);
    }

    // init rs widget (timeout used to ensure that id is set properly)
    timer = $timeout(function() {
        stp.init();
    }, 0);
}
