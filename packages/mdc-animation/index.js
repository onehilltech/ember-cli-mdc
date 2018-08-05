'use strict';

module.exports = {
  name: 'ember-cli-mdc-animation',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/animation/dist/mdc.animation.js');
  }
};
