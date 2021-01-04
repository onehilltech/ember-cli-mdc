/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-theme', target: `^${version}`},
    {name: 'ember-cli-mdc-typography', target: `^${version}`},
    {name: 'ember-cli-mdc-rtl', target: `^${version}`}
  ]
});
