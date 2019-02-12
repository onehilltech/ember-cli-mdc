/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/chips', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-icon'},
    {name: 'ember-cli-mdc-checkbox'},
    {name: 'ember-cli-mdc-ripple'},
    {name: 'ember-cli-mdc-typography'},
    {name: 'ember-cli-mdc-elevation'},
    {name: 'ember-cli-mdc-base'},
    //{name: 'ember-cli-mdc-shape'},
  ]
});
