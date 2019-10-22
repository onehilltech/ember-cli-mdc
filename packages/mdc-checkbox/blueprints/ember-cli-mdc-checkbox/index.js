/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/checkbox', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-form-field'},
    {name: 'ember-cli-mdc-typography'},
  ]
});
