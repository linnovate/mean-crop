'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanCrop, app, auth, database) {
    var gm = require('gm').subClass({
            imageMagick: true
        }),
        osSep = '/',
        fs = require('fs'),
        mkdirOrig = fs.mkdir,
        config = require('meanio').loadConfig();

    app.get('/meanCrop/crop', function(req, res) {

        var path = config.root + req.query.dest;
        path = path.split(osSep);
        path.pop();
        path = path.toString();
        path = path.replace(/,/g, '/');



        if (!fs.existsSync(path)) {
            mkdir_p(path, function(err) {
                crop();
            });
        } else {
            crop();
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

        function crop() {
            var c = JSON.parse(req.query.coords);
            console.log(config.root, req.query.src, req.query.dest);
            gm(config.root + req.query.src)
                .crop(c.w, c.h, c.x, c.y)
                .write(config.root + req.query.dest, function(err) {
                    console.log(err);
                    if (!err) {
                        res.jsonp({
                            success: true,
                            img: {
                                src: req.query.dest
                            }
                        });
                    } else {
                        res.jsonp({
                            success: false,
                            err: err
                        });
                    }
                });
        }

    });

    app.get('/meanCrop/example/render', function(req, res, next) {
        MeanCrop.render('index', {
            package: 'mean-crop'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};