'use strict';

module.exports = {
  name: 'ember-cli-mdc-textfield',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/textfield/dist/mdc.textfield.js',
      production: 'node_modules/@material/textfield/dist/mdc.textfield.min.js'
    });
  }
};
