angular
    .module('fprApp')
    .directive('fprComments', fprComments);

function fprComments() {
    var directive = {
        restrict: 'AE',
        controller: 'commentController as comment',
        bindToController: {
            disqusShortname: '@',
            disqusIdentifier: '@',
            disqusTitle: '@',
            disqusUrl: '@'
        },
        require: 'contentController',
        templateUrl: 'components/comments/comment.html'
    };

    return directive;
}
