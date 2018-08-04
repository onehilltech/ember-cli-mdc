/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-animation'},
        {name: 'ember-cli-mdc-base'},
        {name: 'ember-cli-mdc-theme'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/ripple'},
      ]);
    });
  }
};
