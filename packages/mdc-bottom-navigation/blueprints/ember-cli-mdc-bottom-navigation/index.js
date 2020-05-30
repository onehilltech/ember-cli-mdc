/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-theme', target: '^1.0.0'},
    {name: 'ember-cli-mdc-icon', target: '^1.0.0'},
    {name: 'ember-cli-mdc-ripple', target: '^1.0.0'},
    {name: 'ember-cli-mdc-typography', target: '^1.0.0'},
    {name: 'ember-cli-mdc-elevation', target: '^1.0.0'}
  ]
});
