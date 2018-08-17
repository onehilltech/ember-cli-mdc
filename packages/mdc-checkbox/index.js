'use strict';

module.exports = {
  name: 'ember-cli-mdc-checkbox',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/checkbox/dist/mdc.checkbox.js');
  }
};
