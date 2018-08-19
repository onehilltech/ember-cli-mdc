/* eslint-env node */

const { installer: { installAddons } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return installAddons (this, {
      packages: [
        {name: 'ember-cli-mdc-textfield'},
        {name: 'ember-cli-mdc-button'},
        {name: 'ember-cli-mdc-select'},
        {name: 'ember-cli-mdc-switch'},
        {name: 'ember-cli-mdc-checkbox'}
      ]
    });
  }
};
