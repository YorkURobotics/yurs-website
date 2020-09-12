const { series, src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

const dirs = {
  sass: {
    src: "./website/_assets/_sass/**/*.scss",
    dest: "./website/assets/css/",
  },
  img: {
    src: "./website/_assets/img/*",
    dest: "./website/assets/img",
  },
  js: {
    src: "./website/_assets/js/*.js",
    dest: "./website/assets/js",
  },
};

function compileSassAndMinify() {
  return src(dirs.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(dirs.sass.dest));
}

function uglifyJS() {
  return src(dirs.js.src)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(dirs.js.dest));
}

function minifyImages() {
  return src(dirs.img.src).pipe(imagemin()).pipe(dest(dirs.img.dest));
}

function watchSass() {
  return watch(dirs.sass.src, ["sass"], series(compileSass));
}

exports.default = series(compileSassAndMinify, uglifyJS, minifyImages);