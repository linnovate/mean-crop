'use strict';

angular.module('mean.crop').factory('MeanCrop', ['$http',
  function($http) {
    return {
      name: 'crop',
      cropImage: function(coords, imgSrc, width, height, packagePath, convertImgsrc, destDir) {
        return $http.get('/meanCrop/crop?coords=' + coords + '&src=' + imgSrc + '&w=' + width + '&h=' + height + '&packagePath=' + packagePath + '&destDir=' + destDir + '&convertImgsrc=' + convertImgsrc);
      }
    };
  }
]);
