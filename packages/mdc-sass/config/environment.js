'use strict';

module.exports = function(environment, appConfig) {
  if (!appConfig.sassOptions)
    appConfig.sassOptions = {};

  if (!appConfig.sassOptions.includePaths)
    appConfig.sassOptions.includePaths = [];

  appConfig.sassOptions.includePaths.push ('node_modules');
  appConfig.sassOptions.includePaths.push ('app/styles');

  if (environment === 'test' || appConfig.modulePrefix === 'dummy') {
    appConfig.sassOptions.includePaths.push ('tests/dummy/app/styles');
  }

  return appConfig;
};
