'use strict';

const { get } = require ('lodash');

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    if (type === 'head') {
      let themeColor = get (config, 'ember-cli-mdc.themeColor');

      if (themeColor) {
        return `<meta name="theme-color" content="${themeColor}" />
               <meta name="msapplication-navbutton-color" content="${themeColor}" />
               <meta name="apple-mobile-web-app-status-bar-style" content="${themeColor}" />`;
      }
    }
  },

  optionsFor (type, options) {
    if (type === 'sass') {
      options.cacheInclude = options.cacheInclude || [];
      options.cacheInclude.push (/addon\.scss/);
      options.cacheInclude.push (/_app-theme\.scss/);

      options.cacheInclude.push (/@material\/theme/);
    }

    return options;
  }
};
