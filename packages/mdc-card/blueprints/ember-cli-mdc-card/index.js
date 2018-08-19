/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return installPackages (this, [
      {name: '@material/card'},
    ]).then (() => {
      return installAddons (this, {
        packages: [
          {name: 'ember-cli-mdc-ripple'},
          {name: 'ember-cli-mdc-elevation'},
          {name: 'ember-cli-mdc-rtl'},
          {name: 'ember-cli-mdc-button'},
          {name: 'ember-cli-mdc-icon-button'}
        ]
      })
    });
  }

};
