/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/form-field'}
  ],

  addons: [
    {name: 'ember-cli-mdc-selection-control'},
    {name: 'ember-cli-mdc-rtl'}
  ]
});
