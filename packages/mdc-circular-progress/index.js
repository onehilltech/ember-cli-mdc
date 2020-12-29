'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/circular-progress/dist/mdc.circularProgress.js',
      production: 'node_modules/@material/circular-progress/dist/mdc.circularProgress.min.js'
    });
  },
};
