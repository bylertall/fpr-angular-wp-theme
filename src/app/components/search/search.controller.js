angular
    .module('fprApp')
    .controller('Search', Search);

Search.$inject = ['wpService'];

function Search(wpService) {
    var vm = this;

    vm.filter = {
        s: ''
    };

    vm.currentSearchString = '';
    vm.resultsActive = false;
    vm.showError = false;
    vm.loadingMorePosts = false;
    vm.noMoreResults = false;

    vm.getInitialResults = function($event) {
        if ($event.which == 13) {
            vm.resultsActive = true;
            vm.loadingMorePosts = true;
            _getSearchResults(wpService, vm.filter.s).success(function(res) {
                if (res) {
                    vm.resultsActive = true;
                    vm.posts = wpService.searchResults;
                    vm.noMoreResults = res.length < 20;
                    console.log(vm.noMoreResults);
                    vm.currentSearchString = vm.filter.s;
                    vm.showError = res.length === 0;
                    vm.loadingMorePosts = false;
                }
            });
        }
    };

    vm.getMoreResults = function() {
        vm.loadingMorePosts = true;
        _getSearchResults(wpService, vm.currentSearchString).success(function(res) {
            if (res) {
                vm.posts.concat(wpService.searchResults);
                vm.noMoreResults = res.length < 20;
                console.log(res.length);
                console.log(vm.noMoreResults);
                vm.loadingMorePosts = false;
            }
        });
    };
}

function _getSearchResults(wpService, string) {
    return wpService.getSearchResults(string);
}