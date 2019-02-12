/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/switch', target: '0.43.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-selection-control'},
    {name: 'ember-cli-mdc-elevation'},
    {name: 'ember-cli-mdc-rtl'}
  ]
});
