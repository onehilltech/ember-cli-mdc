'use strict';

module.exports = {
  name: 'ember-cli-mdc-select',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/select/dist/mdc.select.js');
  }
};
