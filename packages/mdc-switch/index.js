'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/switch/dist/mdc.switch.js',
      production: 'node_modules/@material/switch/dist/mdc.switch.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/elevation/);
      options.cacheInclude.push (/@material\/ripple/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/selection-control/);
      options.cacheInclude.push (/@material\/switch/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
};
