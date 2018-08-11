/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-rtl'},
        {name: 'ember-cli-mdc-base'},
        {name: 'ember-cli-mdc-theme'},
        {name: 'ember-cli-mdc-typography'},
        {name: 'ember-cli-mdc-animation'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/floating-label'},
      ]);
    });
  }
};
