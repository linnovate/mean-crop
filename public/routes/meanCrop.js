'use strict';

angular.module('mean.crop').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('meanCrop example page', {
            url: '/meanCrop/example',
            templateUrl: 'crop/views/index.html'
        });
    }
]);
