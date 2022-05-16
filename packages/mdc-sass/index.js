'use strict';
/* eslint-env node */

const SassPlugin = require ('./lib/sass/plugin');

module.exports = {
<<<<<<< HEAD
  name:  require ('./package.json').name,

  included (app) {
    this._super (...arguments);

    if (!!app.project.addonPackages['ember-cli-sass'])
      throw new Error ('ember-cli-mdc is not compatible with ember-cli-sass. You must uninstall ember-cli-sass before continuing.');

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;
  },

  setupPreprocessorRegistry (type, registry) {
    // Remove the current css plugins, and replace it with our own.
    registry.remove ('css', 'broccoli-sass');
    registry.remove ('css', 'ember-cli-sass');

    registry.add ('css', new SassPlugin ({context: this}));
  }
=======
  name: require('./package').name,
>>>>>>> 75a70a66 (v3.3.0...v3.28.5)
};


