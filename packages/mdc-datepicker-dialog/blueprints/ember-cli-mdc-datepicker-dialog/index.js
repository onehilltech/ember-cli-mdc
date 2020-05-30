/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-dialog', target: '^1.0.0'},
    {name: 'ember-cli-mdc-icon-button', target: '^1.0.0'},
    {name: 'ember-moment'},
    {name: 'ember-fullcalendar'}
  ]
});
