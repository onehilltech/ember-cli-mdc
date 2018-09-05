'use strict';

module.exports = {
  name: 'ember-cli-mdc-tab-indicator',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/tab-indicator/dist/mdc.tabIndicator.js',
      production: 'node_modules/@material/tab-indicator/dist/mdc.tabIndicator.min.js'
    });
  }
};
