'use strict';

module.exports = {
  name: 'ember-cli-mdc-ripple',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/ripple/dist/mdc.ripple.js',
      production: 'node_modules/@material/ripple/dist/mdc.ripple.min.js'
    });
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/theme/);

    return options;
  }
};
