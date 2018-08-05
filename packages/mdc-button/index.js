'use strict';

module.exports = {
  name: 'ember-cli-mdc-button',

  included(app, parentAddon) {
    this._super.included.apply (this, arguments);
    let target = (parentAddon || app);

    // Now you can modify the app / parentAddon. For example, if you wanted
    // to include a custom preprocessor, you could add it to the target's
    // registry:
    //
    //     target.registry.add('js', myPreprocessor);
  }
};
