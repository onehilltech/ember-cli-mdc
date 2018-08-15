'use strict';

module.exports = {
  name: 'ember-cli-mdc-switch',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/switch/dist/mdc.switch.js');
  }
};
