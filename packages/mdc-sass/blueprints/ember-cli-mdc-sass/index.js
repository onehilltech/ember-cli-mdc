/* eslint-env node */

const { satisfies } = require ('semver');

const EMBER_CLI_SASS_VERSION = '^7.1.7';

module.exports = {
  description: '',

  normalizeEntityName () {
    // no-op since we're just adding dependencies
  },

  files () {
    let files = this._super (...arguments);

    if (this.project.isEmberCLIAddon ()) {
      // Remove the files that to not pertain to add-ons.
      files = files.filter (item => item !== '__root__/styles/app.scss');

      // We do not need to continue overwrite the theme file.
      if (this.name === 'ember-cli-mdc-sass' || this.project.has ('addon/styles/addon.scss'))
        files = files.filter (item => item !== '__root__/styles/addon.scss');
    }
    else {
      // Remove files that do not pertain to applications projects.
      files = files.filter (item => item !== '__root__/styles/addon.scss');

      // Only include the theme file if it does not already exist.
      if (this.project.has ('app/styles/app.scss'))
        files = files.filter (item => item !== '__root__/styles/app.scss');
    }

    return files;
  },

  afterInstall () {
    const packages = [];

    if (!this.project.addonPackages['ember-cli-sass'] || !satisfies (this.project.addonPackages['ember-cli-sass'].pkg.version, EMBER_CLI_SASS_VERSION))
      packages.push ({name: 'ember-cli-sass', target: EMBER_CLI_SASS_VERSION});

    if (packages.length === 0)
      return;

    return this.addAddonsToProject ({
      packages,
      blueprintOptions: {
        save: true
      }
    });
  }
};
