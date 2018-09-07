'use strict';

module.exports = {
  name: 'ember-cli-mdc-line-ripple',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.js',
      production: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.min.js'
    });
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon.scss/);
    options.cacheInclude.push (/_app-theme.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/base/);
    options.cacheInclude.push (/@material\/line-ripple/);
    options.cacheInclude.push (/@material\/theme/);

    return options;

  }
};
