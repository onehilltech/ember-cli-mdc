/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-elevation'},
        {name: 'ember-cli-mdc-ripple'},
        {name: 'ember-cli-mdc-rtl'},
        {name: 'ember-cli-mdc-typography'},
        {name: 'ember-cli-mdc-icon'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/top-app-bar'},
      ]);
    });
  }
};
