'use strict';

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-mdc-button',

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/base/);
      options.cacheInclude.push (/@material\/button/);
      options.cacheInclude.push (/@material\/elevation/);
      options.cacheInclude.push (/@material\/ripple/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/theme/);
      options.cacheInclude.push (/@material\/typography/);
    }

    return options;
  }
=======
  name: require('./package').name
>>>>>>> 00c2151e... v3.3.0...v3.18.0
};
