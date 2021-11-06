"use strict";

import { paths } from "../gulpfile.babel";
const gulp = require("gulp");
const include = require("gulp-file-include");
const gulpif = require("gulp-if");
const replace = require ("gulp-replace");
const browsersync = require("browser-sync");
const html = require("gulp-htmlmin");
const yargs = require("yargs");

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("html", () => {
    return gulp.src(paths.html.src)
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulpif(production,html({
            removeComments: true,
            collapseWhitespace: true,
        })))
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browsersync.stream());
});