'use strict';

module.exports = {
  name: 'ember-cli-mdc-floating-label',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/floating-label/dist/mdc.floatingLabel.js',
      production: 'node_modules/@material/floating-label/dist/mdc.floatingLabel.min.js'
    });
  }
};
