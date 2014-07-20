'use strict';

angular.module('mean.mean-crop').directive('meanCrop', function($http) {
    return {
        templateUrl: 'mean-crop/directives/crop.html',
        scope: {
            imgSrc: '=',
            cropDest: '=',
            cropCallback: '&'
        },
        restrict: 'E',
        replace: true,
        link: function($scope, element, attrs) {
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
            }
            var jcrop_api,
                boundx,
                boundy,

                // Grab some information about the preview pane
                $preview = $('#preview-pane'),
                $pcnt = $('#preview-pane .preview-container'),
                $pimg = $('#preview-pane .preview-container img'),

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

            $scope.crop = function() {
                $http.get('/meanCrop/crop?coords=' + JSON.stringify($scope.coords) + '&src=' + $scope.imgSrc + '&dest=' + $scope.cropDest).success(function(data) {
                    if (data.success) {
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