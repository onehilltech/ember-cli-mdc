'use strict';

module.exports = {
  name: 'ember-cli-mdc-snackbar',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/snackbar/dist/mdc.snackbar.js',
      production: 'node_modules/@material/snackbar/dist/mdc.snackbar.min.js'
    });
  }
};
