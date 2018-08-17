/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-selection-control'},
        {name: 'ember-cli-mdc-rtl'},
        {name: 'ember-cli-mdc-form-field'},
        {name: 'ember-cli-mdc-typography'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/checkbox'},
      ]);
    });
  }
};
