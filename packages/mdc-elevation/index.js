'use strict';

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-mdc-elevation',

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/animation/);
      options.cacheInclude.push (/@material\/elevation/);
      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
=======
  name: require('./package').name
>>>>>>> f6323ede... v3.3.0...v3.18.0
};
