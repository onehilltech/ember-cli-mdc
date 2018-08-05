'use strict';

module.exports = {
  name: 'ember-cli-mdc-snackbar',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/snackbar/dist/mdc.snackbar.js');
  }
};
