'use strict';

angular.module('mean.crop').directive('meanWindowCrop', function($http) {
  return {
    templateUrl: 'crop/views/directives/meanWindowCrop.html',
    scope: {
      imgSrc: '=',
      dataTarget: '=',
      targetWidth: '=',
      targetHeight: '=',
      cropCallback: '&'
    },
    restrict: 'E',
    replace: true,
    link: function($scope, element, attrs) {
      $('img.crop_me').jWindowCrop({
        targetWidth: $scope.targetWidth, //Width of facebook cover division
        targetHeight: $scope.targetHeight, //Height of cover division
        loadingText: 'Your Cover is uploading....',
        onChange: function(result) {
          $scope.coords = {
            'x': result.cropX,
            'y' :result.cropY,
            'x2': result.cropX + $scope.targetWidth,
            'y2': result.cropY + $scope.targetWidthH,
            'w': $scope.targetWidth,
            'h': $scope.targetHeight
          };
        }
      });
      $scope.crop = function() {
        $http.get('/meanCrop/crop?coords=' + JSON.stringify($scope.coords) + '&src=/' + $scope.imgSrc + '&w=' + $scope.targetWidth + '&h=' + $scope.targetHeight).success(function(data) {
          if (data) {
            if (angular.isDefined(attrs.cropCallback)) {
              $scope.cropCallback({
                data: data
              });
            }
          }
        });
      };
    }
  };
});
