'use strict';

module.exports = {
  name: 'ember-cli-mdc-textfield',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/textfield/dist/mdc.textfield.js');
  }
};
