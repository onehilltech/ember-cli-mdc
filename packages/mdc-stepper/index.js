'use strict';

module.exports = {
  name: 'ember-cli-mdc-stepper',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/dom/dist/mdc.dom.js',
      production: 'node_modules/@material/dom/dist/mdc.dom.min.js'
    });
  }
};
