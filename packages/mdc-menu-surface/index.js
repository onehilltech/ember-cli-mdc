'use strict';

module.exports = {
  name: 'ember-cli-mdc-menu-surface',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/menu-surface/dist/mdc.menuSurface.js',
      production: 'node_modules/@material/menu-surface/dist/mdc.menuSurface.min.js'
    });
  }
};
