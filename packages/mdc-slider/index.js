'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/slider/dist/mdc.slider.js',
      production: 'node_modules/@material/slider/dist/mdc.slider.min.js'
    })
  }
};
