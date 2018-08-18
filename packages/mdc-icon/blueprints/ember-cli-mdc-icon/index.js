/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addBowerPackagesToProject ([
      {name: 'material-design-icons'}
    ]).then (() => {
      return this.addAddonsToProject ({
        packages: [
          {name: 'ember-cli-mdc-theme' }
        ]
      });
    })
  }
};
