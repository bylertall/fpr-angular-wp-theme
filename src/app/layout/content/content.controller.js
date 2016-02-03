angular
    .module('fprApp')
    .controller('contentController', contentController);

contentController.$inject = ['$sce', '$stateParams', 'wpService'];

function contentController($sce, $stateParams, wpService) {
    var vm = this;

    vm.contentLoaded = false;
    vm.rewardstyleId = 0;
    vm.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    init().then(function() {
        vm.post = wpService.post;
        vm.categories = wpService.post.terms['category'];
        vm.tags = wpService.post.terms['post_tag'];
        vm.isFormatted = wpService.isFormatted;
        vm.wpContent = wpService.trustedPostContent;
        vm.outfitDetails = $sce.trustAsHtml(wpService.post.acf['outfit_details']);
        vm.mainCopy = $sce.trustAsHtml(wpService.post.acf['main_copy']);
        vm.rewardstyleId = wpService.post.acf['rewardstyle_id'];
        vm.contentLoaded = true;
    });

    function init() {
        return wpService.getSinglePost($stateParams.slug);
    }
}
