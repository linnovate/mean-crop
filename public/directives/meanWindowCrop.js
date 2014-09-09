'use strict';

angular.module('mean.crop').directive('meanWindowCrop', function($http) {
  return {
    templateUrl: 'crop/views/directives/meanWindowCrop.html',
    scope: {
      imgSrc: '=',
      targetWidth: '=',
      targetHeight: '=',
      packagePath: '=',
      destDir: '='
    },
    // scope: false,
    restrict: 'E',
    replace: true,
    link: function($scope, element, attrs) {
      $scope.$parent.imgSrc = $scope.imgSrc;
      $scope.$parent.targetWidth = $scope.targetWidth;
      $scope.$parent.targetHeight = $scope.targetHeight;
      $scope.$parent.destDir = $scope.destDir;
      $scope.$parent.packagePath = $scope.packagePath;

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

          $scope.$parent.coords = $scope.coords;
        }
      });
    }
  };
});
