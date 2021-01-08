'use strict';

const sass = require ('ember-cli-mdc-sass');

module.exports = function (env, config) {
  config.sassOptions = sass.sassOptions (config, env, config.sassOptions);

  return config;
};
