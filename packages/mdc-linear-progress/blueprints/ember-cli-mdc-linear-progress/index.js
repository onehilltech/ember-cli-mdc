/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/linear-progress', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation', target: `^${version}`},
    {name: 'ember-cli-mdc-progress-indicator', target: `^${version}`},
    {name: 'ember-cli-mdc-theme', target: `^${version}`}
  ]
});
