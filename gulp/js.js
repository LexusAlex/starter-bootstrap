"use strict";

import { paths } from "../gulpfile.babel";

import webpack from "webpack";
import webpackStream from "webpack-stream";

const gulp = require("gulp");
const gulpif = require("gulp-if");
const rename = require("gulp-rename");
const browsersync = require("browser-sync")
const yargs = require("yargs");
const debug = require("gulp-debug")

const webpackConfig = require("../webpack.config.js"),
    argv = yargs.argv,
    production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

gulp.task("js", () => {
    return gulp.src(paths.js.src)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulp.dest(paths.js.dist))
        .pipe(debug({
            "title": "JS files"
        }))
        .pipe(browsersync.stream());
});