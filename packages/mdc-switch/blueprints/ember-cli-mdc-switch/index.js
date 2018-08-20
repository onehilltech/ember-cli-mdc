/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-selection-control'},
        {name: 'ember-cli-mdc-elevation'},
        {name: 'ember-cli-mdc-rtl'},
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/switch'},
      ]);
    });
  }
};
