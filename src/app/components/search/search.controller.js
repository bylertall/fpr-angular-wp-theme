angular
    .module('fprApp')
    .controller('Search', Search);

Search.$inject = ['wpService'];

function Search(wpService) {
    var vm = this;

    vm.filter = {
        s: ''
    };

    // initial config
    vm.posts = [];
    vm.currentSearchString = '';
    vm.resultsActive = false;
    vm.showError = false;
    vm.loadingMorePosts = false;
    vm.noMoreResults = false;

    // get search results
    vm.getInitialResults = function($event) {
        if ($event.which == 13) {

            // if empty string is entered
            if (vm.filter.s == '') {
                vm.resultsActive = false;
                return vm.posts = [];
            }

            // reset vars if new search
            vm.showError = false;
            vm.noMoreResults = false;
            vm.resultsActive = true;
            vm.loadingMorePosts = true;
            _getSearchResults(wpService, vm.filter.s).success(function(res) {
                if (res) {
                    vm.currentSearchString = vm.filter.s;
                    vm.posts = wpService.searchResults;
                    vm.resultsActive = true;
                    vm.showError = res.length === 0;
                    vm.noMoreResults = res.length < 20;
                    vm.loadingMorePosts = false;
                }
            });
        }
    };

    // get more search results (load more button)
    vm.getMoreResults = function() {
        vm.loadingMorePosts = true;
        _getSearchResults(wpService, vm.currentSearchString).success(function(res) {
            if (res) {
                vm.posts.concat(wpService.searchResults);
                vm.noMoreResults = res.length < 20;
                vm.loadingMorePosts = false;
            }
        });
    };
}

function _getSearchResults(wpService, string) {
    return wpService.getSearchResults(string);
}