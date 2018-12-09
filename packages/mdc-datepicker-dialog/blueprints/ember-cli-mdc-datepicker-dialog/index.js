/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-dialog'},
    {name: 'ember-cli-mdc-icon-button'},
    {name: 'ember-moment'},
    {name: 'ember-fullcalendar'}
  ]
});
