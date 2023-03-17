'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/textfield/dist/mdc.textfield.js',
      production: 'node_modules/@material/textfield/dist/mdc.textfield.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
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
    }

    return options;
  }
=======
>>>>>>> 6554fd42 (v3.18.0...v3.28.6)
};
