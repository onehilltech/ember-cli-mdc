'use strict';

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-mdc-linear-progress',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.js',
      production: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.min.js'
    });
  }
=======
  name: require('./package').name
>>>>>>> a8eae090... v2.18.2...v3.18.0
};
