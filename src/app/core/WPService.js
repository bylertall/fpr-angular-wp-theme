angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce', '$state'];

function wpService ($http, $sce, $state) {
    var apiUrl = WPAPI.api_url,
        currentFeedPage = 0,
        currentCategoryPage = 0,
        currentTagPage = 0,
        currentSearchPage = 0,
        currentSearchStr = '',
        wpService = {
            getFeed: getFeed,
            feed: [],
            getSinglePost: getSinglePost,
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            getPostsByCategory: getPostsByCategory,
            postsByCategory: [],
            currentCategoryName: '',
            currentCategorySlug: '',
            totalCategoryPosts: 0,
            getPostsByTag: getPostsByTag,
            postsByTag: [],
            currentTagName: '',
            currentTagSlug: '',
            totalTagPosts: 0,
            getSearchResults: getSearchResults,
            searchResults: []
        };

    // Main Feed
    function getFeed() {
        var feed = [];

        // if page is 0, set to page 1
        // otherwise increment
        currentFeedPage === 0 ? currentFeedPage = 1 : currentFeedPage++;

        return $http.get(apiUrl + '/posts/?page=' + currentFeedPage)
            .success(function(res, status, headers) {
                feed = wpService.feed.concat(res);

                // Use angular.copy to update controller with new results
                angular.copy(feed, wpService.feed);

                console.log(wpService.feed);
            });
    }

    // Single Post
    function getSinglePost(slug) {
        var i,
            postArrayLength = wpService.feed.length;

        // If post is present in current feed array, use it
        // Otherwise get post by slug
        if (postArrayLength) {
            for (i = 0; i < postArrayLength; i++) {
                if (wpService.feed[i].slug === slug) {
                    wpService.post = wpService.feed[i];
                    return _isFormatted(wpService.post);
                }
            }
        }

        return $http.get(apiUrl + '/posts/?filter[name]=' + slug)
            .success(function(res, status, headers) {
                // filter returns an array of posts, only 1 should return
                wpService.post = res[0];
                _isFormatted(wpService.post);
            });
    }

    // Posts by category term
    function getPostsByCategory(category) {
        var feed = [];

        _setCategoryInfo(category);

        // if page is 0, set to page 1
        // otherwise increment
        currentCategoryPage === 0 ? currentCategoryPage = 1 : currentCategoryPage++;

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category + '&page=' + currentCategoryPage)
            .success(function(res, status, headers) {
                feed = wpService.postsByCategory.concat(res);

                angular.copy(feed, wpService.postsByCategory);
            });
    }

    // Posts by tag term
    function getPostsByTag(tag) {
        var feed = [];

        _setTagInfo(tag);

        // if page is 0, set to page 1
        // otherwise increment
        currentTagPage === 0 ? currentTagPage = 1 : currentTagPage++;

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag + '&page=' + currentTagPage)
            .success(function(res) {
                feed = wpService.postsByTag.concat(res);

                angular.copy(feed, wpService.postsByTag);
            });
    }

    // get search results
    function getSearchResults(search) {
        var feed = [];

        // reset search properties if new search string
        if (currentSearchStr !== search) {
            currentSearchPage = 0;
            currentSearchStr = search;

            angular.copy(feed, wpService.searchResults);
        }

        // if page is 0, set to page 1
        // otherwise increment
        currentSearchPage === 0 ? currentSearchPage = 1 : currentSearchPage++;

        return $http.get(apiUrl + '/posts/?filter[s]=' + search + '&page=' + currentSearchPage + '&filter[posts_per_page]=20')
            .success(function(res) {
                feed = wpService.searchResults.concat(res);

                // update search results
                angular.copy(feed, wpService.searchResults)
            });
    }

    return wpService;

    ////////////////////////////////////
    // Private functions
    ////////////////////////////////////

    // determine is post is in new format w/ custom fields
    // if not, run post.content through $sce.trustAsHtml
    function _isFormatted(post) {
        if (post.acf['main_copy'] !== '') {
            return wpService.isFormatted = true;
        }

        wpService.trustedPostContent = $sce.trustAsHtml(post.content);
        return wpService.isFormatted = false;
    }

    // get category taxonomy info
    function _setCategoryInfo(category) {
        // only get category info if different from current category
        if (category === wpService.currentCategorySlug) return;

        // clear array & reset page # for new category
        wpService.postsByCategory = [];
        currentCategoryPage = 0;

        return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
            .success(function(res) {
                // set category name if get request results in empty array
                if (!res.length) {
                    return wpService.currentCategoryName = category;
                }

                // set category details
                wpService.currentCategorySlug = category;
                wpService.currentCategoryName = res[0].name;
                wpService.totalCategoryPosts = res[0].count;
            });
    }

    // get tag taxonomy info
    function _setTagInfo(tag) {
        // only get tag info if different from current tag
        if (tag === wpService.currentTagSlug) return;

        // clear array & reset page # for new tag
        wpService.postsByTag = [];
        currentTagPage = 0;

        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                // set tag name if get request results in empty array
                if (!res.length) {
                    return wpService.currentTagName = tag;
                }

                // set tag details
                wpService.currentTagSlug = tag;
                wpService.currentTagName = res[0].name;
                wpService.totalTagPosts = res[0].count;
            });
    }
}
