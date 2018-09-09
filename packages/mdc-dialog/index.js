'use strict';

module.exports = {
  name: 'ember-cli-mdc-dialog',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/dialog/dist/mdc.dialog.js',
      production: 'node_modules/@material/dialog/dist/mdc.dialog.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/button/);
      options.cacheInclude.push (/@material\/dialog/);
      options.cacheInclude.push (/@material\/elevation/);
      options.cacheInclude.push (/@material\/ripple/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/theme/);
      options.cacheInclude.push (/@material\/typography/);
    }

    return options;
  }
};
