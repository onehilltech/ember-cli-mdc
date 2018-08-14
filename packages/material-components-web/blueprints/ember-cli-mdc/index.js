/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-button'},
        {name: 'ember-cli-mdc-card'},
        {name: 'ember-cli-mdc-dialog'},
        {name: 'ember-cli-mdc-fab'},
        {name: 'ember-cli-mdc-form'},
        {name: 'ember-cli-mdc-layout-grid'},
        {name: 'ember-cli-mdc-snackbar'}
      ]
    });
  }
};
