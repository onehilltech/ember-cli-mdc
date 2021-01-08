'use strict';

const fs = require ('fs-extra');

function watchPathIfExists (sassOptions, path) {
  const { includePaths } = sassOptions;

  if (fs.pathExistsSync (path)) {
    if (!includePaths.includes (path))
      includePaths.push (path);
  }
}

module.exports = function (env, config) {
  console.log (config);

  if (!config.sassOptions)
    config.sassOptions = {};

  Object.assign (config.sassOptions, {
    onlyIncluded: true,
    importer: function (url, prev, done) {
      console.log ('importer called ()...');

      if (url.startsWith ('@material')) {
        let file = url.replace (/@material\//, '')
        done ({file})
      }
      else {
        done ({file: url})
      }
    }
  });

  if (!config.sassOptions.includePaths)
    config.sassOptions.includePaths = [];

  const { includePaths } = config.sassOptions;

  // Watch the following directories if they exists.
  watchPathIfExists (config.sassOptions, 'app/styles');
  watchPathIfExists (config.sassOptions, 'addon/styles');
  watchPathIfExists (config.sassOptions, 'node_modules');

  if (config.modulePrefix !== 'dummy') {
    if (!includePaths.includes ('app/styles'))
      includePaths.push ('app/styles');
  }
  else {
    if (!includePaths.includes ('tests/dummy/app/styles'))
      includePaths.push ('tests/dummy/app/styles');
  }

  if (env === 'test') {
    if (!includePaths.includes ('tests/dummy/app/styles'))
      includePaths.push ('tests/dummy/app/styles');
  }

  return config;
};
