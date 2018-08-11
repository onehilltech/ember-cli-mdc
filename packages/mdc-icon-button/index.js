'use strict';

module.exports = {
  name: 'ember-cli-mdc-icon-button',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/icon-button/dist/mdc.iconButton.js');
  }
};
