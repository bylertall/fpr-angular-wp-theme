angular
    .module('fprApp')
    .controller('searchController', searchController);

searchController.$inject = ['wpService', 'smoothScroll', '$window'];

function searchController(wpService, smoothScroll, $window) {
    var vm = this,
        elInput = angular.element(document.getElementById('search'));

    vm.filter = {
        s: ''
    };

    // initial config
    vm.posts = [];
    vm.numPosts = 0;
    vm.currentSearchString = '';
    vm.resultsActive = false;
    vm.showError = false;
    vm.loadingMorePosts = false;
    vm.noMoreResults = false;
    elInput[0].focus();

    // get search results
    vm.getInitialResults = function($event) {
        if ($event.which === 13) {
            elInput[0].blur();

            // if empty string is entered
            if (vm.filter.s === '') {
                vm.resultsActive = false;
                vm.posts = [];
                return;
            }

            // reset vars if new search
            vm.posts = [];
            vm.showError = false;
            vm.noMoreResults = false;
            vm.resultsActive = true;
            vm.loadingMorePosts = true;
            _getSearchResults(vm.filter.s)
                .then(function(res) {
                    if (res) {
                        var options = {
                            duration: 400,
                            easing: 'ease'
                        }

                        smoothScroll(document.getElementsByClassName('main-nav')[0], options);

                        vm.currentSearchString = vm.filter.s;
                        vm.posts = wpService.searchResults;
                        vm.resultsActive = true;
                        vm.showError = res.data.length === 0;
                        vm.noMoreResults = res.data.length < 10;
                        vm.loadingMorePosts = false;
                    }
                });
        }
    };

    // get more search results (load more button)
    vm.getMoreResults = function() {
        vm.loadingMorePosts = true;
        _getSearchResults(vm.currentSearchString)
            .then(function(res) {
                if (res) {
                    vm.posts.concat(wpService.searchResults);
                    vm.noMoreResults = res.length < 10;
                    vm.loadingMorePosts = false;
                }
            });
    };

    function _getSearchResults(string) {
        return wpService.getSearchResults(string);
    }
}
