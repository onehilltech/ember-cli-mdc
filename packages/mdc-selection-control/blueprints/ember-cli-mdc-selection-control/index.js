/* eslint-env node */

const { installer: { installAddons } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return installAddons (this, {
      packages: [
        {name: 'ember-cli-mdc-ripple'}
      ]
    });
  }
};
