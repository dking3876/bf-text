const gulp = require('gulp');
const gulpCopy = require('gulp-copy');
var run = require('gulp-run');
var argv = require('yargs').argv;
const version = (argv.versionType === undefined) ? 'patch' : argv.versionType;
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

const DIST_COMPONENTS_ROOT = __dirname + '/build';
const inlineResources = require('./scripts/inline');
 
var sass = require('gulp-sass');

gulp.task('sass', ()=> {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./src/"));

});
gulp.task('sass:watch', ()=>{
    gulp.watch('./src/**/*.scss', ['sass']);
})
//first build the project and copy to dist folder
gulp.task(':build-dist', ()=>{
    return gulp
    .src('src/**/*', {base: './src'})
    .pipe(gulp.dest('build'));
})
gulp.task(':npm-version',[':inline-resources'], ()=>{
    return run('npm version '+version).exec();
    //eval('npm publish dist/src');
})
gulp.task(':cp-package',[':npm-version'], ()=>{
    return gulp
    .src(['package.json', 'README.MD'])
    .pipe(gulpCopy('build/'));
})
gulp.task(':publish', [':cp-package'], ()=>{
    return run('npm publish build/').exec();
})
//now inline all the resources
gulp.task(':inline-resources',[':build-dist'], () => {
    inlineResources(DIST_COMPONENTS_ROOT)
});

gulp.task('default', ['build']);

gulp.task('build', [':build-dist', ':inline-resources']);

gulp.task('publish', [':build-dist', ':inline-resources', ':npm-version', ':cp-package', ':publish'])
