/* eslint-env node */

const { installer: { installAddons } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addBowerPackagesToProject ([
      {name: 'material-design-icons'}
    ]).then (() => {
      installAddons (this, {
        packages: [
          {name: 'ember-cli-mdc-theme' }
        ]
      });
    });
  }
};
