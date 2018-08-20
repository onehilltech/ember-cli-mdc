/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return installPackages (this, [
      {name: '@material/textfield'},
    ]).then (() => {
      return installAddons (this, {
        packages: [
          {name: 'ember-cli-mdc-animation'},
          {name: 'ember-cli-mdc-base'},
          {name: 'ember-cli-mdc-ripple'},
          {name: 'ember-cli-mdc-rtl'},
          {name: 'ember-cli-mdc-theme'},
          {name: 'ember-cli-mdc-typography'},
          {name: 'ember-cli-mdc-icon'},
          {name: 'ember-cli-mdc-floating-label'},
          {name: 'ember-cli-mdc-line-ripple'},
          {name: 'ember-cli-mdc-notched-outline'}
        ]
      });
    });
  }
};
