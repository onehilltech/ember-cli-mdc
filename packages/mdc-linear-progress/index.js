'use strict';

module.exports = {
  name: 'ember-cli-mdc-linear-progress',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.js',
      production: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.min.js'
    });
  }
};
