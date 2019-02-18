/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/checkbox', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-selection-control'},
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-form-field'},
    {name: 'ember-cli-mdc-typography'},
  ]
});
