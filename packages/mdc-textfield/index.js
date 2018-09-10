'use strict';

module.exports = {
  name: 'ember-cli-mdc-textfield',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/textfield/dist/mdc.textfield.js',
      production: 'node_modules/@material/textfield/dist/mdc.textfield.min.js'
    });
  },

  sassOptions (options) {
    options.cacheInclude = options.cacheInclude || [];
    options.cacheInclude.push (/addon\.scss/);
    options.cacheInclude.push (/_app-theme\.scss/);

    options.cacheInclude.push (/@material\/animation/);
    options.cacheInclude.push (/@material\/base/);
    options.cacheInclude.push (/@material\/floating-label/);
    options.cacheInclude.push (/@material\/line-ripple/);
    options.cacheInclude.push (/@material\/notched-outline/);
    options.cacheInclude.push (/@material\/ripple/);
    options.cacheInclude.push (/@material\/rtl/);
    options.cacheInclude.push (/@material\/textfield/);
    options.cacheInclude.push (/@material\/theme/);
    options.cacheInclude.push (/@material\/typography/);

    return options;
  }
};
