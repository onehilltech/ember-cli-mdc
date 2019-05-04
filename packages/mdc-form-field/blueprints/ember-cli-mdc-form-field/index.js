/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/form-field', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-rtl'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-typography'}
  ]
});
