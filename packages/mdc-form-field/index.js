'use strict';

module.exports = {
  name: 'ember-cli-form-field',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/form-field/dist/mdc.formField.js');
  }
};
