/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/checkbox', target: '2.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-form-field'},
    {name: 'ember-cli-mdc-typography'},
  ]
});
