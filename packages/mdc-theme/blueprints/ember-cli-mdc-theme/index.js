/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');
const { version } = require ('../../package.json');
const target = require ('ember-cli-mdc-utils').target (version);

module.exports = Blueprint.extend ({
  addons: [
    {name: 'ember-cli-mdc-sass', target },
    {name: 'ember-cli-custom-properties'},
    {name: 'ember-modifier', target: '^2.0.0' }
  ],

  files () {
    if (!this.project)
      return this._super.call (this, ...arguments);

    let files = this._super.call (this, ...arguments);

    if (this.project.isEmberCLIAddon ()) {
      // Remove the files that to not pertain to add-ons.
      files = files.filter (item => !['__root__/styles/_app-theme.scss', '__root__/styles/app.scss'].includes (item));
    }
    else {
      // Remove files that do not pertain to applications projects.
      files = files.filter (item => !['tests/dummy/app/styles/_app-theme.scss', '__root__/styles/addon.scss'].includes (item));
    }

    return files;
  },
});
