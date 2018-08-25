'use strict';

module.exports = {
  name: 'ember-cli-mdc-line-ripple',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.js',
      production: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.min.js'
    });
  }
};
