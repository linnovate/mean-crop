'use strict';

angular.module('mean.crop').directive('meanCrop', function($http) {
  return {
    templateUrl: 'crop/views/directives/meanCrop.html',
    scope: {
      imgSrc: '=',
      targetWidth: '=',
      targetHeight: '=',
      packagePath: '=',
      destDir: '=',
      convertImgsrc: '='
    },
    restrict: 'E',
    replace: true,
    link: function($scope, element, attrs) {
      $scope.$root.imgSrc = $scope.imgSrc;
      $scope.$root.targetWidth = $scope.targetWidth;
      $scope.$root.targetHeight = $scope.targetHeight;
      $scope.$root.destDir = $scope.destDir;
      $scope.$root.packagePath = $scope.packagePath;
      $scope.$root.convertImgsrc = $scope.convertImgsrc;

      function updatePreview(c) {
        $scope.coords = c;
        if (parseInt(c.w) > 0) {
          var rx = xsize / c.w;
          var ry = ysize / c.h;
          $pimg.css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
          });
        }
        $scope.$root.coords = $scope.coords;
      }

      $('#mean-crop-pane .mean-crop-container').width($scope.targetWidth);
      $('#mean-crop-pane .mean-crop-container').height($scope.targetHeight);

      var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#mean-crop-pane'),
        $pcnt = $('#mean-crop-pane .mean-crop-container'),
        $pimg = $('#mean-crop-pane .mean-crop-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();

      $('#target').Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview,
        aspectRatio: xsize / ysize
      }, function() {
        // Use the API to get the real image size
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        // Store the API in the jcrop_api variable
        jcrop_api = this;
        // Move the preview into the jcrop container for css positioning
        $preview.appendTo(jcrop_api.ui.holder);
      });
    }
  };
});
