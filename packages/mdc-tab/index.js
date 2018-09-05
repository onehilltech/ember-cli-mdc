'use strict';

module.exports = {
  name: 'ember-cli-mdc-tab',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/tab/dist/mdc.tab.js',
      production: 'node_modules/@material/tab/dist/mdc.tab.min.js'
    });
  }
};
