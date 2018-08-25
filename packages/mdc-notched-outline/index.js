'use strict';

module.exports = {
  name: 'ember-cli-mdc-notched-outline',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/notched-outline/dist/mdc.notchedOutline.js',
      production: 'node_modules/@material/notched-outline/dist/mdc.notchedOutline.min.js'
    });
  }
};
