'use strict';

module.exports = {
  name: 'ember-cli-mdc-ripple',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/ripple/dist/mdc.ripple.js',
      production: 'node_modules/@material/ripple/dist/mdc.ripple.min.js'
    });
  }
};
