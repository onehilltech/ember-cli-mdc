/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName () {
    // no-op since we're just adding dependencies
  },

  afterInstall () {
    return installPackages (this, [
      {name: '@material/checkbox'},
    ]).then (() => {
      return installAddons (this, {
        packages: [
          {name: 'ember-cli-mdc-selection-control'},
          {name: 'ember-cli-mdc-rtl'},
          {name: 'ember-cli-mdc-form-field'},
          {name: 'ember-cli-mdc-typography'}
        ]
      });
    });
  }
};
