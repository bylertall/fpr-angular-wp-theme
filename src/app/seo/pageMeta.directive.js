angular
    .module('fprApp')
    .directive('fprPageMeta', fprPageMeta);

fprPageMeta.$inject = ['$document', '$location'];
function fprPageMeta($document, $location) {
    var directive = {
        scope: {
            metaTitle: '@',
            metaDescription: '@',
            metaUrl: '@',
            metaImg: '@'
        },
        link: link
    };

    return directive;

    function link(scope, elem, attr) {
        var metaTags = $document.find('meta'),
            metaEls = {},
            defaultDescription = 'A San Francisco Style Blog by Kate Ogata',
            defaultTitle = 'The Fancy Pants Report | A San Francisco Style Blog by Kate Ogata',
            defaultUrl = $location.absUrl();

        //////////////////
        // TODO: setup default single post description, or use specific one (ACF) if provided
        // TODO: twitter card
        /////////////////

        // get meta tag elements
        metaEls.description = angular.element(_.find(metaTags, {'name': 'description'}));
        metaEls.ogDescription = angular.element(getOgTag('og:description'));
        metaEls.title = $document.find('title');
        metaEls.ogTitle = angular.element(getOgTag('og:title'));
        metaEls.ogUrl = angular.element(getOgTag('og:url'));
        metaEls.ogImage = angular.element(getOgTag('og:image'));

        // update meta tag elements
        metaEls.ogDescription.attr('content', (scope.metaDescription !== undefined ? scope.metaDescription : defaultDescription));
        metaEls.description.attr('content', (scope.metaDescription !== undefined ? scope.metaDescription : defaultDescription));
        metaEls.ogTitle.attr('content', (scope.metaTitle !== undefined ? scope.metaTitle : defaultTitle));
        metaEls.ogUrl.attr('content', (scope.metaUrl !== undefined ? scope.metaUrl : defaultUrl));
        // for og:image
        if (scope.metaImg !== undefined && scope.metaImg !== 'false') {
            metaEls.ogImage.attr('content', scope.metaImg);
        } else {
            metaEls.ogImage.attr('content', '');
        }
        // for page title tag
        metaEls.title[0].innerHTML = scope.metaTitle !== undefined ? (scope.metaTitle + ' | The Fancy Pants Report') : defaultTitle;

        function getOgTag(tagName) {
            return _.find(metaTags, function(tag) {
                return tag.attributes[0].nodeValue === tagName;
            });
        }
    }
}
