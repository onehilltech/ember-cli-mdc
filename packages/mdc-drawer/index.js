'use strict';

module.exports = {
  name: 'ember-cli-mdc-drawer',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/drawer/dist/mdc.drawer.js');
  }
};
