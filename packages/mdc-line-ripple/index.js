'use strict';

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-mdc-line-ripple',

  included (app) {
    this._super (...arguments);

    app.import ({
      development: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.js',
      production: 'node_modules/@material/line-ripple/dist/mdc.lineRipple.min.js'
    });
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/line-ripple/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;

  }
=======
  name: require('./package').name
>>>>>>> e54cfebe... v3.3.0...v3.18.0
};
