angular
    .module('fprApp')
    .controller('commentController', commentController);

commentController.$inject = ['$window'];

function commentController($window) {
    var vm = this;

    vm.disqusShortname = 'staging-thefancypantsreport';
    vm.showComments = false;
    vm.toggleComments = toggleComments;

    function toggleComments() {
        vm.showComments = !vm.showComments;

        if (!$window.DISQUS) {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = 'https://' + vm.disqusShortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        } else {
            $window.DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.identifier = vm.disqusIdentifier;
                    this.page.url = vm.disqusUrl;
                    this.page.title = vm.disqusTitle;
                    // this.language = scope.disqus_config_language;
                    // this.page.remote_auth_s3 = scope.disqus_remote_auth_s3;
                    // this.page.api_key = scope.disqus_api_key;
                }
            });
        }
    }
}
