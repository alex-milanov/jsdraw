'use strict';

const fse = require('fs-extra');
const path = require('path');

const paths = {
  'dist/fonts': 'node_modules/font-awesome/fonts',
  // 'dist/img': 'src/img',
  // 'dist/lib/lodash.min.js': 'node_modules/lodash/lodash.min.js'
};

Object.keys(paths).forEach(
  p => fse.copySync(
    path.resolve(__dirname, '..', paths[p]),
    path.resolve(__dirname, '..', p)
  )
);
