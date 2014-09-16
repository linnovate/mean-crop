'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanCrop, app, auth, database) {
  var Path = require('path');
  var gm = require('gm').subClass({
      imageMagick: true
    }),
    osSep = '/',
    fs = require('fs'),
    mkdirOrig = fs.mkdir,
    config = require('meanio').loadConfig();

  function crop(coords, imgSrc, imgDest, callback) {
    var c = JSON.parse(coords);
    var imgName = imgSrc.split('/')[imgSrc.split('/').length - 1];
    gm(imgSrc)
      .crop(c.w, c.h, c.x, c.y)
      .write(config.root + '/' + imgDest + '/' + imgName, function(err) {
        if (!err) {
          callback({
            success: true,
            img: {
              src: imgDest + '/' + imgName
            }
          });
        } else {
          callback({
            success: false,
            err: err
          });
        }
      });
  }

  function mkdir_p(path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);
    position = position || 0;

    if (position >= parts.length) {
      return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function(err) {
      if (err === null) {
        mkdir_p(path, callback, position + 1);
      } else {
        mkdirOrig(directory, function(err) {
          if (err && err.code !== 'EEXIST') {
            return callback(err);
          } else {
            mkdir_p(path, callback, position + 1);
          }
        });
      }
    });
  }

  app.get('/meanCrop/crop', function(req, res) {
    var imgSrc = Path.resolve(config.root, packageRelativePath);

    if (req.query.convertImgsrc === true) {
      var packageParts = req.query.src.split('/');
      var packageName = packageParts[0];
      var packageRelativePath = packageParts.splice(1).join('/');
      imgSrc = Path.resolve(config.root, req.query.packagePath, packageName, 'public', packageRelativePath);
    }

    var imgDest = req.query.destDir;

    if (!fs.existsSync(config.root + imgDest)) {
      mkdir_p(config.root + '/' + imgDest, function(err) {
        crop(req.query.coords, imgSrc, req.query.destDir, function(data) {
          res.jsonp(data);
        });
      });
    } else {
      crop(req.query.coords, imgSrc, imgDest, function(data) {
        res.jsonp(data);
      });
    }
  });

  app.get('/meanCrop/example/render', function(req, res, next) {
    MeanCrop.render('index', {
      package: 'crop'
    }, function(err, html) {
      // Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
