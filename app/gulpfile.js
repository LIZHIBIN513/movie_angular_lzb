

'use strict';
var gulp = require('gulp');

// concat合并
var concat = require('gulp-concat');

// uglify压缩

var uglify = require('gulp-uglify');

// 新建任务


gulp.task('script',function(){
    // **表示任意文件夹。
    gulp.src(['./**/*.js','!./node_modules/**/*.js','!./assets/**/*.js','!./gulpfile.js'])
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'))
});