Ready to be used!!

## The repository contains
* Directive using [JCrop](https://github.com/tapmodo/Jcrop) to crop images using a crosshair on Angular end & then send data back to the server end to save the cropped image.
* Directive using [JWindowCrop](https://github.com/tybro0103/jWindowCrop) to crop images using a selection window(Simalar to Facebook) on Angular end & then send data back to the server end to save the cropped image.

## Requirements

You need to have [ImageMagick](http://www.imagemagick.org/) installed, otherwise you will get weird errors.

## Installation

  Install Package:

    $ mean install mean-crop

## Usage

  **What's in this package:**

 * Directives to crop images using crosshair crop & selection crop.
 * Factory method to crop & save the image wherever needed. Factory method accepts the following arguments:
    * **coords:** co-ordinated of the cropped region relative to the actual image.
    * **imgSrc:** Source path of the actual image. This path gets converted into absolute filepath while cropping on the server side. packagePath & convertImgsrc are helpers to convert this path into absolute filepath.
    * **width:** Target width for the image.
    * **height:** Target width for the image.
    * **packagePath(optional):** If the image being cropped resides inside a package, then this attribute should define the relative path to package directory(from mean).e.g., if we trying to crop ***crop/assets/img/logo.png*** & this file actually resides at ***/Users/piyuesh23/htdocs/mean/packages/contrib/crop/public/assets/img/logo.png***, the packagePath should be ***packages/contrib***. convertImgsrc should be set to ***true***, if we setting a value for packagePath.
    * **destDir:** Relative directory path from mean root installation where the cropped image should be saved.
    * **convertImgsrc(optional):**
       * **true:** will look for image defined in imgSrc at **config.root + '/' + packagePath + '/' + packageName + '/public' + {imgSrc - packageName}** while trying to crop it.
       * **false/empty:** will look for image defined in imgSrc at **config.root + '/' + imgSrc** while trying to crop it.

**Examples**

* *Directives*

  * jWindowCrop

    ```HTML
        <div class="" data-ng-controller="MeanCropController">
          <div class="example-container">
            <mean-window-crop target-width="100" target-height="100" img-src="'crop/assets/img/logo.png'" dest-dir="'packages/images/thumbs'" package-path="'packages/contrib'" convert-imgsrc="true"></mean-window-crop>
            <button class="btn btn-success" data-ng-click="crop()">Crop</button>
          </div>
        </div>
    ```

  * jCrop

    ```HTML
        <div class="" data-ng-controller="MeanCropController">
          <div class="example-container">
            <mean-crop target-width="100" target-height="100" img-src="'crop/assets/img/logo.png'" dest-dir="'packages/images/thumbs'" package-path="'packages/contrib'" convert-imgsrc="true"></mean-crop>
            <button class="btn btn-success" data-ng-click="crop()">Crop</button>
          </div>
        </div>
    ```

* *Controller*

    ```javascript
      'use strict';
      angular.module('mean.crop').controller('MeanCropController', ['$rootScope', '$rootScope', 'Global', 'MeanCrop',
        function($scope, $rootScope, Global, MeanCrop) {
          $scope.global = Global;
          $scope.crop = function() {
            MeanCrop.cropImage(JSON.stringify($rootScope.coords), $rootScope.imgSrc, $rootScope.targetWidth, $rootScope.targetHeight, $rootScope.packagePath, $rootScope.convertImgsrc, $rootScope.destDir)
              .success(function(data) {
                console.log(data);
              });
          };
        }
      ]);
    ```

## Demo

  * http://localhost:3000/#!/meanCrop/example - Examples of both the directives listed down here.
  * Select the area that you want to crop & click on crop button.
  * Browse to packages/images/thumbs/<image-resolution>/logo.png to check the cropped selection.
