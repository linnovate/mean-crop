'use strict';

angular.module('mean.crop').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('jCrop example page', {
      url: '/meanCrop/jcrop/example',
      templateUrl: 'crop/views/jcropDemo.html'
    })
    .state('jWindowCrop example page', {
      url: '/meanCrop/jwindowcrop/example',
      templateUrl: 'crop/views/jwindowcropDemo.html'
    });
  }
]);
