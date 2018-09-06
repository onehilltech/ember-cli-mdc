'use strict';

const sass = require ('node-sass');
const debug = require ('debug')('ember-cli-mdc-sass');

module.exports = function(environment, appConfig) {
  if (!appConfig.sassOptions)
    appConfig.sassOptions = {};

  debug ('using node-sass');
  appConfig.sassOptions.implementation = sass;

  if (!appConfig.sassOptions.includePaths)
    appConfig.sassOptions.includePaths = [];

  const includePaths = appConfig.sassOptions.includePaths;

  if (!includePaths.includes ('node_modules'))
    appConfig.sassOptions.includePaths.push ('node_modules');

  if (appConfig.modulePrefix !== 'dummy') {
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

  return appConfig;
};
