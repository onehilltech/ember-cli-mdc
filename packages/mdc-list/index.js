'use strict';

module.exports = {
  name: 'ember-cli-mdc-list',

  included (app) {
    this._super (...arguments);

    app.import ('node_modules/@material/list/dist/mdc.list.js');
  }
};
