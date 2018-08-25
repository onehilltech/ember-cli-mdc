'use strict';

module.exports = {
  name: 'ember-cli-mdc-top-app-bar',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.js',
      production: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.min.js'
    });
  }
};
