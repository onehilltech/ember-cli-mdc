'use strict';

module.exports = {
  name: 'ember-cli-mdc-tab-scroller',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/tab-scroller/dist/mdc.tabScroller.js',
      production: 'node_modules/@material/tab-scroller/dist/mdc.tabScroller.min.js'
    });
  }
};
