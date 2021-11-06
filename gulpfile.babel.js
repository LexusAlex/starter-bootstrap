"use strict";

const gulp = require('gulp');

const requireDir = require("require-dir");

const paths = {
        html: {
            src: [
                "./src/html/**/*.html",
                //"./src/html/pages/*.html"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.html",
                "./src/html/**/*.html"
            ]
        },
        css: {
            src: "./src/css/main.{scss,sass}",
            dist: "./dist/css/",
            watch: [
                "./src/blocks/**/*.{scss,sass}",
                "./src/css/**/*.{scss,sass}"
            ]
        },
        js: {
            src: "./src/js/index.js",
            dist: "./dist/js/",
            watch: [
                "./src/blocks/**/*.js",
                "./src/js/**/*.js"
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
        },
        sprites: {
            src: "./src/img/svg/*.svg",
            dist: "./dist/img/sprites/",
            watch: "./src/img/svg/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}"
        },
        favicons: {
            src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
            dist: "./dist/img/favicons/",
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/"
        }
    };

requireDir("./gulp/");

export {paths}

export const development = gulp.series("clean",
    gulp.parallel(["html", "scss", "js"]),
    gulp.parallel("server"));

export const prod = gulp.series("clean",
    gulp.parallel(["html", "scss", "js"]));
/*export const development = gulp.series("clean", "smart-grid",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "webp", "sprites", "fonts", "favicons", "gzip"]));*/

export default development;