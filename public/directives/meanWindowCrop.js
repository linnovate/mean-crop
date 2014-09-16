'use strict';

angular.module('mean.crop').directive('meanWindowCrop', function($http) {
  return {
    templateUrl: 'crop/views/directives/meanWindowCrop.html',
    scope: {
      imgSrc: '=',
      targetWidth: '=',
      targetHeight: '=',
      packagePath: '=',
      destDir: '=',
      convertImgsrc: '='
    },
    // scope: false,
    restrict: 'E',
    replace: true,
    link: function($scope, element, attrs) {
      $scope.$root.imgSrc = $scope.imgSrc;
      $scope.$root.targetWidth = $scope.targetWidth;
      $scope.$root.targetHeight = $scope.targetHeight;
      $scope.$root.destDir = $scope.destDir;
      $scope.$root.packagePath = $scope.packagePath;
      $scope.$root.convertImgsrc = $scope.convertImgsrc;

      $('img.crop_me').jWindowCrop({
        targetWidth: $scope.targetWidth, //Width of facebook cover division
        targetHeight: $scope.targetHeight, //Height of cover division
        loadingText: 'Your Cover is uploading....',

        onChange: function(result) {
          $scope.coords = {
            'x': result.cropX,
            'y' :result.cropY,
            'x2': result.cropX + $scope.targetWidth,
            'y2': result.cropY + $scope.targetWidth,
            'w': $scope.targetWidth,
            'h': $scope.targetHeight
          };

          $scope.$root.coords = $scope.coords;
        }
      });
    }
  };
});
