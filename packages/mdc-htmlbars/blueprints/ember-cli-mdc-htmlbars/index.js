/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-theme'},
    {name: 'ember-cli-mdc-typography'},
    {name: 'ember-cli-mdc-rtl'}
  ]
});
