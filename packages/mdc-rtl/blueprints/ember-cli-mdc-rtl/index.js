/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-sass'},
      ]
    }).then (() => {
      this.addPackagesToProject ([
        {name: '@material/rtl'},
      ]);
    });
  }
};
