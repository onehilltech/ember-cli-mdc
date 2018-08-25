'use strict';

module.exports = {
  name: 'ember-cli-mdc-switch',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/switch/dist/mdc.switch.js',
      production: 'node_modules/@material/switch/dist/mdc.switch.min.js'
    });
  }
};
