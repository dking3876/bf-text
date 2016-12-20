const gulp = require('gulp');



const DIST_COMPONENTS_ROOT = __dirname + '/dist/derykediter';
const inlineResources = require('./scripts/inline');


//first build the project


//now inline all the resources
gulp.task(':inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT));

gulp.task('default', [':inline-resources']);