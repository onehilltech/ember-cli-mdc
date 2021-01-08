'use strict';

const sass = require ('../');

module.exports = function (environment, config) {
  config.sassOptions = sass.sassOptions (config, environment, config.sassOptions);

  return config;
};
