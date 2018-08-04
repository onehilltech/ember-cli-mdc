'use strict';

module.exports = {
  name: 'ember-cli-mdc-ripple',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/ripple/dist/mdc.ripple.js');
  }};
