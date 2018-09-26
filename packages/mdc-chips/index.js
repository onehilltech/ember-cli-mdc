'use strict';

module.exports = {
  name: 'ember-cli-mdc-chips',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/chips/dist/mdc.chips.js',
      production: 'node_modules/@material/chips/dist/mdc.chips.min.js'
    });
  }
};
