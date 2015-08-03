angular
    .module('fprApp')
    .directive('fprInstaLoaded', fprInstaLoaded);

function fprInstaLoaded() {
    return {
        link: link
    }
}

function link(scope, elem, attrs) {
    if (scope.$first){
        elem.on('load', function() {
            scope.$emit('instaWidgetLoaded');
        });
    }
}