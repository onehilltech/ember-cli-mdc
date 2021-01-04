/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: 'material-design-icons'}
  ],

  addons: [
    {name: 'ember-cli-mdc-base', target: `^${version}`}
  ]
});

