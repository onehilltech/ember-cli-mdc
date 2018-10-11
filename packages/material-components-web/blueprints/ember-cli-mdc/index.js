/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-button'},
        {name: 'ember-cli-mdc-card'},
        {name: 'ember-cli-mdc-checkbox'},
        {name: 'ember-cli-mdc-chips'},
        {name: 'ember-cli-mdc-dialog'},
        {name: 'ember-cli-mdc-drawer'},
        {name: 'ember-cli-mdc-fab'},
        {name: 'ember-cli-mdc-form'},
        {name: 'ember-cli-mdc-htmlbars'},
        {name: 'ember-cli-mdc-layout-grid'},
        {name: 'ember-cli-mdc-linear-progress'},
        {name: 'ember-cli-mdc-list'},
        {name: 'ember-cli-mdc-select'},
        {name: 'ember-cli-mdc-snackbar'},
        {name: 'ember-cli-mdc-stepper'},
        {name: 'ember-cli-mdc-switch'},
        {name: 'ember-cli-mdc-tabs'},
        {name: 'ember-cli-mdc-textfield'},
        {name: 'ember-cli-mdc-top-app-bar'}
      ]
    });
  }
};
