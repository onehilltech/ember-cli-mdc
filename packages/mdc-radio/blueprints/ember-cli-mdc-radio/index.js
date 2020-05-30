/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/radio', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-form-field', target: '^1.0.0'},
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'}
  ]
});
