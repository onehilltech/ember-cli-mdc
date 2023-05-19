'use strict';

const path = require ('path');
const fs = require ('fs-extra');

function getNodeModulePaths (parentDir) {
  const paths = [];

  while (parentDir !== path.sep) {
    const nodeModulePath = `${parentDir}${path.sep}node_modules`;

    if (fs.pathExistsSync (nodeModulePath))
      paths.push (nodeModulePath);

    parentDir = path.resolve (parentDir, '..');
  }

  return paths;
}

module.exports = function (environment, config) {
  if (!config.sassOptions)
    config.sassOptions = {};

  if (!config.sassOptions.includePaths)
    config.sassOptions.includePaths = [];

  const includePaths = config.sassOptions.includePaths;

  if (!includePaths.includes ('node_modules')) {
    config.sassOptions.includePaths.push ('./node_modules');

    // Just in case we are running in a workspace. In these cases, the ember application
    // is hosted in a node_module path located in a parent directory. We can use the
    // _ environment variable to get the location of ember.

    const nodeModulePaths = getNodeModulePaths (path.resolve (process.env.PWD, '..'));
    config.sassOptions.includePaths.push (...nodeModulePaths);
  }

  console.log (config.sassOptions.includePaths);

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
