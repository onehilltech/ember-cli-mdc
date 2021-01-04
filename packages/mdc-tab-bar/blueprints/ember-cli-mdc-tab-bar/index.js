/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/tab-bar', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-elevation', target: `^${version}`},
    {name: 'ember-cli-mdc-tab-scroller', target: `^${version}`}
  ]
});
