'use strict';

angular.module('mean.crop').controller('MeanCropController', ['$rootScope', '$rootScope', 'Global', 'MeanCrop',
  function($scope, $rootScope, Global, MeanCrop) {
    $scope.global = Global;
    $scope.package = {
      name: 'crop'
    };

    $scope.cropCallback = function(data) {
      if (data.success)
        $scope.showViewBtn = true;
    };

    $scope.crop = function() {
      MeanCrop.cropImage(JSON.stringify($rootScope.coords), $rootScope.imgSrc, $rootScope.targetWidth, $rootScope.targetHeight, $rootScope.packagePath, $rootScope.convertImgsrc, $rootScope.destDir)
        .success(function(data) {
          console.log(data);
        });
    };
  }
]);
