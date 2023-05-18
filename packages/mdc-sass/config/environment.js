'use strict';

function projectHasWorkspace () {
  return true;
}

module.exports = function (environment, config) {
  console.log (process.env);

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

    const { _ } = process.env;
    const emberModulePath = _.replace ('/.bin/ember', '');
    config.sassOptions.includePaths.push (emberModulePath);
  }

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
