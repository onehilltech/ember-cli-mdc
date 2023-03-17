'use strict';

module.exports = {
  name: require('./package').name,
<<<<<<< HEAD

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
>>>>>>> 3fc4d634 (v3.18.0...v3.28.6)
};
