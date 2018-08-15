/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-floating-label'},
        {name: 'ember-cli-mdc-line-ripple'},
        {name: 'ember-cli-mdc-notched-outline'},
        {name: 'ember-cli-mdc-ripple'},
        {name: 'ember-cli-mdc-rtl'},
        {name: 'ember-cli-mdc-typography'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/select'},
      ]);
    });
  }
};
