'use strict';

const sass = require ('ember-cli-mdc-sass');

module.exports = function (environment, config) {
  config.sassOptions = sass.sassOptions (config, environment, config.sassOptions);

  return config;
};
