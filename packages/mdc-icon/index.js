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
      const icons = mdc.icons || {};
      const styles = icons.styles || [];

      let styleLinks = styles.map (style => STYLE_MAP[style]);
      styleLinks.unshift ('Material+Icons');

      this.ui.writeLine ('Linking Material Icon fonts with the application.');
      return `<link href="https://fonts.googleapis.com/icon?family=${styleLinks.join ('|')}" rel="stylesheet" />`;
    }
  }
};
