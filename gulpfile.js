var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = {
    entry: "./js/App.jsx",

    output: {
        path: path.resolve('.', 'dist'),
        publicPath: "/assets/",
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve('.', 'node_modules'),
                loader: 'babel-loader'
            }
        ]
    }
};

gulp.task('webpack:build-dev', function (callback) {
    var compiler = webpack(webpackConfig);
    compiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    webpackConfig.devtool = "eval";
    webpackConfig.debug = true;

    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: "./static",
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('default', ['webpack:build-dev']);

gulp.task('watch', function () {
    gulp.watch('js/*.jsx', ['webpack:build-dev']);
});
