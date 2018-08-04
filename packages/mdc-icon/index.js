'use strict';

module.exports = {
  name: 'ember-cli-mdc-icon',

  included (app) {
    this._super.included.apply (this, arguments);

    // material-design-icons
    app.import (app.bowerDirectory + '/material-design-icons/iconfont/MaterialIcons-Regular.eot', {destDir: 'assets/fonts/material-design-icons'});
    app.import (app.bowerDirectory + '/material-design-icons/iconfont/MaterialIcons-Regular.tff', {destDir: 'assets/fonts/material-design-icons'});
    app.import (app.bowerDirectory + '/material-design-icons/iconfont/MaterialIcons-Regular.woff', {destDir: 'assets/fonts/material-design-icons'});
    app.import (app.bowerDirectory + '/material-design-icons/iconfont/MaterialIcons-Regular.woff2', {destDir: 'assets/fonts/material-design-icons'});
  },

  contentFor (type, config) {
    if (type === 'head-footer') {
      let mdc = config['ember-cli-mdc'];
      let embedFonts = mdc && mdc.embedIconFonts;

      if (!embedFonts) {
        return '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />';
      }
      else {
        this.ui.writeLine ('Embedding Material Icons font');
      }
    }
  }
};
