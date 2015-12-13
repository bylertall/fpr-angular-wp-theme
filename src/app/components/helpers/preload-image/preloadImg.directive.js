// inspired by http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
// and https://github.com/RevillWeb/angular-preload-image

angular
    .module('fprApp')
    .directive('fprPreloadImg', fprPreloadImg);

function fprPreloadImg() {
    var directive = {
        scope: {
            fprPreloadImg: '@'
        },
        link: link
    };

    return directive;

    function link(scope, elem, attrs) {
        var imgUrl = scope.fprPreloadImg;
        // if background img url is NOT false or empty string, set background img url, then emit ready
        // otherwise, just emit ready to  remove loading
        preLoader(imgUrl, function(img) {
            if (attrs.nopin === 'nopin') {
                img.attr('nopin', 'nopin');
            }
            elem.append(img);
        });
    }

    function preLoader(url, successCallback) {
        var img = angular.element(new Image());

        img.bind('load', function() {
            successCallback(img);
        }).attr('src', url);
    }
}
