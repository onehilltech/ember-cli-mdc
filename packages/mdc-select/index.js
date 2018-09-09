'use strict';

module.exports = {
  name: 'ember-cli-mdc-select',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/select/dist/mdc.select.js',
      min: 'node_modules/@material/select/dist/mdc.select.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/notched-outline/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
};
