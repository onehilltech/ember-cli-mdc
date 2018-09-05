'use strict';

module.exports = {
  name: 'ember-cli-mdc-tab-bar',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/tab-bar/dist/mdc.tabBar.js',
      production: 'node_modules/@material/tab-bar/dist/mdc.tabBar.min.js'
    })
  }
};
