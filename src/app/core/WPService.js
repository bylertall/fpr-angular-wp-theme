angular
    .module('fprApp')
    .factory('wpService', wpService);

wpService.$inject = ['$http', '$sce'];

function wpService ($http, $sce) {
    var apiUrl = WPAPI.api_url,
        wpService = {
            feed: [],
            currentFeedPage: 2,
            post: {},
            isFormatted: false,
            trustedPostContent: undefined,
            categories: [],
            postsByCategory: [],
            currentCategoryName: '',
            currentCategorySlug: '',
            numCategoryPosts: 0,
            postsByTag: [],
            currentTagName: '',
            currentTagSlug: '',
            numTagPosts: 0
        };

    // Main Feed
    wpService.getInitialFeed = function() {
        var postArrayLength = wpService.feed.length;

        // get page 1 if feed is empty
        // each page is 10 posts
        if (!postArrayLength) {
            return $http.get(apiUrl + '/posts/')
                .success(function(res) {
                    wpService.feed = res;
                    console.log(wpService.feed);
                });
        }


    };

    // Load more on main feed
    wpService.getMoreFeed = function() {
        var feed = [];

        return $http.get(apiUrl + '/posts/?page=' + wpService.currentFeedPage)
            .success(function(res) {
                feed = wpService.feed.concat(res);
                wpService.currentFeedPage++;

                // Use angular.copy to update controller with new results
                angular.copy(feed, wpService.feed);
                console.log(wpService.feed);
            });
    }

    // Single Post
    wpService.getSinglePost = function(slug) {
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
            .success(function(res) {
                // filter returns an array of posts, only 1 should return
                wpService.post = res[0];
                _isFormatted(wpService.post);
            });


    };

    // Posts by category term
    wpService.getPostsByCategory = function(category) {
        if (wpService.currentCategorySlug === category) {
            return;
        }

        _getCategoryInfo(category);

        return $http.get(apiUrl + '/posts/?filter[category_name]=' + category)
            .success(function(res) {

                angular.copy(res, wpService.postsByCategory);
                console.log("number of category posts: " + wpService.postsByCategory.length);
                console.log(res);
            });
    };

    // Posts by tag term
    wpService.getPostsByTag = function(tag) {
        if (wpService.currentTagSlug === tag) {
            return;
        }

        _getTagInfo(tag);

        return $http.get(apiUrl + '/posts/?filter[tag]=' + tag)
            .success(function(res) {

                angular.copy(res, wpService.postsByTag);
                console.log(res);
                console.log("number of tag posts: " + wpService.postsByTag.length);

            });
    };

    return wpService;


    //
    // Private functions
    //

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
    function _getCategoryInfo(category) {
        return $http.get(apiUrl + '/taxonomies/category/terms/?filter[slug]=' + category)
            .success(function(res) {
                wpService.currentCategorySlug = category;
                wpService.currentCategoryName = res[0].name;
                wpService.numCategoryPosts = res[0].count;
                console.log('Number of posts for ' + wpService.currentCategoryName + ': ' + wpService.numCategoryPosts);
                console.log('Get category info resulted in:');
                console.log(res);
            });
    }

    // get tag taxonomy info
    function _getTagInfo(tag) {
        return $http.get(apiUrl + '/taxonomies/post_tag/terms/?filter[slug]=' + tag)
            .success(function(res) {
                wpService.currentTagSlug = tag;
                wpService.currentTagName = res[0].name;
                wpService.numTagPosts = res[0].count;
                console.log('Number of posts for ' + wpService.currentTagName + ': ' + wpService.numTagPosts);
                console.log('Get tag info resulted in:');
                console.log(res);
            });
    }
}
