'use strict';

module.exports = {
  name: 'ember-cli-mdc-floating-label',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/floating-label/dist/mdc.floatingLabel.js');
  }
};
