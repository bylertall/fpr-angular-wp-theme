// inspired by http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
// and https://github.com/RevillWeb/angular-preload-image

angular
    .module('fprApp')
    .directive('fprPreloadBg', fprPreloadBg);

function fprPreloadBg() {
    var directive = {
        link: link
    };

    return directive;
}

function link(scope, elem, attrs) {
    // url given in html template
    var url = attrs.fprPreloadBg;

    // if background img url is NOT false or empty string, set background img url, then emit ready
    // otherwise, just emit ready to  remove loading
    if (url !== 'false' && url !== '') {
        preLoader(url, function() {
            elem.css({
                'background-image': 'url("' + url + '")'
            });
        });
    }

    scope.$emit('bgImageReady');

}

function preLoader(url, successCallback) {
    angular.element(new Image()).bind('load', function() {
        successCallback();
    }).attr('src', url);
}