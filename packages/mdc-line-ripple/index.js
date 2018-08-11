'use strict';

module.exports = {
  name: 'ember-cli-mdc-line-ripple',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/line-ripple/dist/mdc.lineRipple.js');
  }
};
