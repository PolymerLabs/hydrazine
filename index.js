/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

//jshint node: true
'use strict';

var crisper = require('gulp-crisper');
var lazypipe = require('lazypipe');
var polyclean = require('polyclean');
var rename = require('gulp-rename');
var vulcanize = require('gulp-vulcanize');
var htmlmin = require('gulp-html-minifier');

module.exports = lazypipe()
  .pipe(vulcanize, {
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
  })
  .pipe(htmlmin, {
    ignoreCustomComments: [/@license/],
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
  })
  .pipe(polyclean.cleanJsComments)
  // .pipe(polyclean.uglifyJs)
  // .pipe(polyclean.cleanCss)
  .pipe(crisper)
  .pipe(rename, function(path) {
    path.basename += '.build';
  })
;