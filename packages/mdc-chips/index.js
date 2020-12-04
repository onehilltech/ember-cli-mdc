'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/chips/dist/mdc.chips.js',
      production: 'node_modules/@material/chips/dist/mdc.chips.min.js'
    });
  }
};
