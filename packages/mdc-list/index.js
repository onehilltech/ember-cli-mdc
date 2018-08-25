'use strict';

module.exports = {
  name: 'ember-cli-mdc-list',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/list/dist/mdc.list.js',
      production: 'node_modules/@material/list/dist/mdc.list.min.js'
    });
  }
};
