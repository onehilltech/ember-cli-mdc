'use strict';

module.exports = {
  name: 'ember-cli-mdc-slider',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/slider/dist/mdc.slider.js',
      production: 'node_modules/@material/slider/dist/mdc.slider.min.js'
    })
  }
};
