'use strict';

module.exports = {
  name: 'ember-cli-mdc-ripple',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/ripple/dist/mdc.ripple.js');
  }
};
