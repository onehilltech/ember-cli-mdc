/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/textfield', target: '^6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-ripple', target },
    {name: 'ember-cli-mdc-rtl', target },
    {name: 'ember-cli-mdc-icon', target },
    {name: 'ember-cli-mdc-floating-label', target },
    {name: 'ember-cli-mdc-line-ripple', target },
    {name: 'ember-cli-mdc-notched-outline', target},
    {name: 'ember-cli-mdc-shape', target }
  ]
});
