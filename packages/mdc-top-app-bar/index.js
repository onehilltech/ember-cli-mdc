'use strict';

module.exports = {
  name: 'ember-cli-mdc-top-app-bar',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.js',
      production: 'node_modules/@material/top-app-bar/dist/mdc.topAppBar.min.js'
    });
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/base/);
    options.cacheInclude.push (/@material\/elevation/);
    options.cacheInclude.push (/@material\/ripple/);
    options.cacheInclude.push (/@material\/rtl/);
    options.cacheInclude.push (/@material\/theme/);
    options.cacheInclude.push (/@material\/top-app-bar/);
    options.cacheInclude.push (/@material\/typography/);

    return options;
  }
};
