/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/tab-scroller', target: '3.2.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-animation'},
    {name: 'ember-cli-mdc-base'},
    {name: 'ember-cli-mdc-tab'}
  ]
});
