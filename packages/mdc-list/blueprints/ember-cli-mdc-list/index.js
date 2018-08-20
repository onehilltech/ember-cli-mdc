/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName () {
    // no-op since we're just adding dependencies
  },

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-ripple'},
        {name: 'ember-cli-mdc-rtl'},
        {name: 'ember-cli-mdc-typography'},
        {name: 'ember-cli-mdc-icon'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/list'},
      ]);
    });
  }
};
