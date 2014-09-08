'use strict';

angular.module('mean.crop').controller('MeanCropController', ['$scope', 'Global', 'MeanCrop',
    function($scope, Global, MeanCrop) {
        $scope.global = Global;
        $scope.package = {
            name: 'crop'
        };

        $scope.cropCallback = function(data) {
            console.log(data);
            if (data.success)
                $scope.showViewBtn = true;
        };
    }
]);
