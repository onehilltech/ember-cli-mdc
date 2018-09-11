'use strict';
/* eslint-env node */

const SassPlugin = require ('./lib/sass-plugin');

module.exports = {
  name:  'ember-cli-mdc-sass',

  setupPreprocessorRegistry (type, registry) {
    registry.add ('css', new SassPlugin ({context: this}));

    registry.remove ('css', 'broccoli-sass');
    registry.remove ('css', 'ember-cli-sass');
  },

  included (app) {
    this._super (...arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      if (!options.includePaths)
        options.includePaths = [];

      const includePaths = options.includePaths;

      if (!includePaths.includes ('node_modules'))
        options.includePaths.push ('node_modules');

      if (this.app.modulePrefix !== 'dummy') {
        if (!includePaths.includes ('app/styles'))
          includePaths.push ('app/styles');
      }
      else {
        if (!includePaths.includes ('tests/dummy/app/styles'))
          includePaths.push ('tests/dummy/app/styles');
      }

      if (process.env.EMBER_ENV === 'test') {
        if (!includePaths.includes ('tests/dummy/app/styles'))
          includePaths.push ('tests/dummy/app/styles');
      }
    }

    return options;
  }
};