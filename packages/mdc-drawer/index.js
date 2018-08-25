'use strict';

module.exports = {
  name: 'ember-cli-mdc-drawer',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/drawer/dist/mdc.drawer.js',
      production: 'node_modules/@material/drawer/dist/mdc.drawer.min.js'
    });
  }
};
