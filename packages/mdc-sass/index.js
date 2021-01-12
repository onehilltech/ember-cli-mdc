'use strict';
/* eslint-env node */

const SassPlugin = require ('./lib/sass/plugin');

module.exports = {
  name:  require ('./package.json').name,

  included (app) {
    this._super (...arguments);

    /*
    if (!!app.project.addonPackages['ember-cli-sass'])
      throw new Error ('ember-cli-mdc is not compatible with ember-cli-sass. It will be ignored in favor of ember-cli-mdc-sass.');
     */
  },

  setupPreprocessorRegistry (type, registry) {
    // Remove the current css plugins, and replace it with our own.
    registry.remove ('css', 'broccoli-sass');
    registry.remove ('css', 'ember-cli-sass');

    registry.add ('css', new SassPlugin ({context: this}));
  }
};


