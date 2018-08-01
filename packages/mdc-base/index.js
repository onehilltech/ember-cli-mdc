'use strict';

module.exports = {
  name: 'ember-cli-mdc-base',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/base/dist/mdc.base.js');
  }
};
