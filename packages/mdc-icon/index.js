'use strict';

const STYLE_MAP = {
  outlined: 'Material+Icons+Outlined',
  twoTone: 'Material+Icons+Two+Tone',
  round: 'Material+Icons+Round',
  sharp: 'Material+Icons+Sharp'
};

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super (...arguments);

    if (process.env.CORBER) {
      this.ui.writeLine ('Bundling Material Icon fonts with the application.');

      // We are using corber to build the application. This means that we need to
      // embed the icons in the application bundle.
      app.import ('node_modules/material-design-icons/iconfont/material-icons.css');
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot', {destDir: 'assets'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.tff', {destDir: 'assets'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff', {destDir: 'assets'});
      app.import ('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2', {destDir: 'assets'});
    }
  },

  contentFor (type, config) {
    this._super (...arguments);

    if (type === 'head-footer') {
      if (!process.env.CORBER) {
        const mdc = config['ember-cli-mdc'] || {};
        const icons = mdc.icons || {};
        const styles = icons.styles || [];

        let styleLinks = styles.map (style => STYLE_MAP[style]);
        styleLinks.unshift ('Material+Icons');

        this.ui.writeLine ('Linking Material Icon fonts with the application.');
        return `<link href="https://fonts.googleapis.com/icon?family=${styleLinks.join ('|')}" rel="stylesheet" />`;
      }
    }
  }
};
