'use strict';

module.exports = {
  name: 'ember-cli-mdc-checkbox',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/checkbox/dist/mdc.checkbox.js',
      production: 'node_modules/@material/checkbox/dist/mdc.checkbox.min.js'
    });
  }
};
