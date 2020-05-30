/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/checkbox', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-rtl', target: '^1.0.0'},
    {name: 'ember-cli-mdc-form-field', target: '^1.0.0'},
    {name: 'ember-cli-mdc-typography', target: '^1.0.0'},
  ]
});
