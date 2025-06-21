const { series, src, dest, parallel, watch } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

const dirs = {
  sass: {
    src: "./website/_assets/_sass/**/*.scss",
    dest: "./website/assets/css/",
  },
  img: {
    src: "./website/_assets/img/**",
    dest: "./website/assets/img",
  },
  js: {
    src: "./website/_assets/js/*.js",
    dest: "./website/assets/js",
  },
  svg: {
    src: "./website/_assets/svg/*",
    dest: "./website/assets/svg",
  },
  webfonts: {
    src: "./website/_assets/webfonts/*",
    dest: "./website/assets/webfonts",
  },
  html: {
    src: "./website/_site/*.html",
    dest: "./website/_site",
  },
};

function compileSassAndMinify() {
  return src(dirs.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      cleanCSS({
        compatibility: "ie8",
        level: {
          1: {
            specialComments: 0,
          },
        },
      }),
    )
    .pipe(
      rename({
        extname: ".min.css",
      }),
    )
    .pipe(dest(dirs.sass.dest));
}

function uglifyJS() {
  return src(dirs.js.src)
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      }),
    )
    .pipe(dest(dirs.js.dest));
}

function minifyImages() {
  return src(dirs.img.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 7 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(dest(dirs.img.dest));
}

function processImages() {
  return src(dirs.img.src).pipe(dest(dirs.img.dest));
}

function processSvgs() {
  return src(dirs.svg.src).pipe(dest(dirs.svg.dest));
}

function processWebfonts() {
  return src(dirs.webfonts.src).pipe(dest(dirs.webfonts.dest));
}

exports.prebuild = parallel(compileSassAndMinify, uglifyJS, minifyImages, processSvgs, processWebfonts);

exports.devprebuild = parallel(compileSassAndMinify, uglifyJS, processImages, processSvgs, processWebfonts);

function minifyHtml() {
  return src(dirs.html.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      }),
    )
    .pipe(dest(dirs.html.dest));
}

exports.postbuild = parallel(minifyHtml);

exports.dev = () => {
  watch(dirs.sass.src, compileSassAndMinify);
  watch(dirs.js.src, uglifyJS);
  watch(dirs.svg.src, processSvgs);
  watch(dirs.webfonts.src, processWebfonts);
  watch(dirs.img.src, processImages);
};
