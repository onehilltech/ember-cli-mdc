'use strict';

module.exports = {
  name: 'ember-cli-mdc-icon-button',

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ('node_modules/@material/icon-button/dist/mdc.iconButton.js');
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/base/);
    options.cacheInclude.push (/@material\/icon-button/);
    options.cacheInclude.push (/@material\/ripple/);
    options.cacheInclude.push (/@material\/theme/);

    return options;
  }
};
