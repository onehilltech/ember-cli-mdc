/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-dialog', target},
    {name: 'ember-cli-mdc-icon-button', target},
    {name: 'ember-moment'},
    {name: 'ember-fullcalendar'}
  ]
});
