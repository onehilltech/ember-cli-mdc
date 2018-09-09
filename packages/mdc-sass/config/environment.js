'use strict';

module.exports = function (environment, config) {
  if (!config.sassOptions)
    config.sassOptions = {};

  if (!config.sassOptions.includePaths)
    config.sassOptions.includePaths = [];

  const includePaths = config.sassOptions.includePaths;

  if (!includePaths.includes ('node_modules'))
    config.sassOptions.includePaths.push ('node_modules');

  if (config.modulePrefix !== 'dummy') {
    if (!includePaths.includes ('app/styles'))
      includePaths.push ('app/styles');
  }
  else {
    if (!includePaths.includes ('tests/dummy/app/styles'))
      includePaths.push ('tests/dummy/app/styles');
  }

  if (environment === 'test') {
    if (!includePaths.includes ('tests/dummy/app/styles'))
      includePaths.push ('tests/dummy/app/styles');
  }

  return config;
};
