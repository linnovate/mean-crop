'use strict';

angular.module('mean.crop').controller('MeanCropController', ['$scope', 'Global', 'MeanCrop',
  function($scope, Global, MeanCrop) {
    $scope.global = Global;
    $scope.package = {
      name: 'crop'
    };

    $scope.cropCallback = function(data) {
      if (data.success)
        $scope.showViewBtn = true;
    };

    $scope.crop = function() {
      MeanCrop.cropImage(JSON.stringify($scope.coords), $scope.imgSrc, $scope.targetWidth, $scope.targetHeight, $scope.packagePath, $scope.destDir)
        .success(function(data) {
          console.log(data);
        });
    };
  }
]);
