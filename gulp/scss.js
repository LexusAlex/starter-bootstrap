"use strict";

import { paths } from "../gulpfile.babel";

const yargs = require("yargs");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const plumber = require("gulp-plumber");
const sass = require('gulp-sass')(require('sass'));
const groupmedia = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const mincss = require("gulp-clean-css");
const rename = require("gulp-rename");
const debug = require("gulp-debug")
const browsersync = require("browser-sync")

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("scss", () => {
    return gulp.src(paths.css.src)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(plumber())
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            cascade: false,
            grid: true
        })))
        .pipe(gulpif(production, mincss({
            compatibility: "ie8", level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(plumber.stop())
        .pipe(gulpif(!production, sourcemaps.write("./maps/")))
        .pipe(gulp.dest(paths.css.dist))
        .pipe(debug({
            "title": "CSS files"
        }))
        .on("end", browsersync.reload);
});