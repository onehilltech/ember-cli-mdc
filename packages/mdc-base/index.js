'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/base/dist/mdc.base.js',
      production: 'node_modules/@material/base/dist/mdc.base.min.js'
    });
  }
=======
>>>>>>> df7a18be (v3.18.0...v3.28.5)
};
