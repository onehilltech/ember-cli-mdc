'use strict';

module.exports = {
  name: require('./package').name,

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/feature-targeting/);
      options.cacheInclude.push (/@material\/image-list/);
      options.cacheInclude.push (/@material\/rtl/);
      options.cacheInclude.push (/@material\/shape/);
      options.cacheInclude.push (/@material\/theme/);
      options.cacheInclude.push (/@material\/typography/);
    }

    return options;
  }
};
