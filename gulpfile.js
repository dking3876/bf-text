const gulp = require('gulp');
const gulpCopy = require('gulp-copy');
var run = require('gulp-run');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

const DIST_COMPONENTS_ROOT = __dirname + '/build';
const inlineResources = require('./scripts/inline');


//first build the project and copy to dist folder
gulp.task(':build-dist', ()=>{
    gulp
    .src('package.json')
    .pipe(gulpCopy('build/'));
    //.pipe(gulp.dest('build'));

    return gulp
    .src('src/**/*', {base: './src'})
    //.pipe(gulpCopy('dist/'));
    .pipe(gulp.dest('build'));
})
gulp.task(':publish',[':inline-resources'], ()=>{
    return run('npm version patch').exec();
    //eval('npm publish dist/src');
})

gulp.task(":compile", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

//now inline all the resources
gulp.task(':inline-resources',[':build-dist'], () => inlineResources(DIST_COMPONENTS_ROOT));

gulp.task('default', [':inline-resources']);

gulp.task('build', [':build-dist']);

gulp.task('publish', [':build-dist', ':inline-resources', ':publish'])

gulp.task('typescript-compile', [':compile']);