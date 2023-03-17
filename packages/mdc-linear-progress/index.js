'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.js',
      production: 'node_modules/@material/linear-progress/dist/mdc.linearProgress.min.js'
    });
  }
=======
>>>>>>> 520bd251 (v3.18.0...v3.28.6)
};
