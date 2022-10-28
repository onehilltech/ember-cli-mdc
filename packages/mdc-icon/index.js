'use strict';

const STYLE_MAP = {
  outlined: 'Material+Icons+Outlined',
  twoTone: 'Material+Icons+Two+Tone',
  round: 'Material+Icons+Round',
  sharp: 'Material+Icons+Sharp'
};

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    this._super (...arguments);

    if (type === 'head-footer') {
      const mdc = config['ember-cli-mdc'] || {};
      const icon = mdc.icon || mdc.icons || {};
      const {preconnect = true, dynamicLoad = true, styles = []} = icon;
      const lines = [];

      if (!dynamicLoad) {
        if (preconnect) {
          lines.push ('<link href="https://fonts.googleapis.com" rel="preconnect" />')
        }

        const styleLinks = styles.map (style => STYLE_MAP[style]);
        styleLinks.unshift ('Material+Icons');
        const href = `https://fonts.googleapis.com/icon?family=${styleLinks.join ('|')}`;

        lines.push (`<link href="${href}" rel="stylesheet" />`)
      }

      return lines;
    }
  }
};
