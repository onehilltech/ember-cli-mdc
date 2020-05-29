/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    {name: '@material/typography', target: '6.0.0'}
  ],

  addons: [
    {name: 'ember-cli-mdc-sass', blueprintOptions: {save: true}}
  ]
});
