'use strict';

module.exports = {
  name: 'ember-cli-mdc-notched-outline',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/notched-outline/dist/mdc.notchedOutline.js');
  }

};
