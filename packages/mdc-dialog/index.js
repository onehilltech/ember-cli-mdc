'use strict';

module.exports = {
  name: 'ember-cli-mdc-dialog',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/dialog/dist/mdc.dialog.js',
      production: 'node_modules/@material/dialog/dist/mdc.dialog.min.js'
    });
  }
};
