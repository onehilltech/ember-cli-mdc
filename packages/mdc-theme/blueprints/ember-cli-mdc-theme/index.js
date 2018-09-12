/* eslint-env node */

const { installer: { installAddons, installPackages } } = require ('ember-cli-blueprint-helpers');

module.exports = {
  description: '',

  normalizeEntityName () {
    // no-op since we're just adding dependencies
  },

  files () {
    if (!this.project)
      return this._super (...arguments);

    let files = this._super (...arguments);

    if (this.project.isEmberCLIAddon ()) {
      // Remove the files that to not pertain to add-ons.
      files = files.filter (item => item !== '__root__/styles/_app-theme.scss');

      if (this.project.has ('tests/dummy/app/styles/_app-theme.scss'))
        files = files.filter (item => item !== 'tests/dummy/app/styles/_app-theme.scss');
    }
    else {
      // Remove files that do not pertain to applications projects.
      files = files.filter (item => item !== 'tests/dummy/app/styles/_app-theme.scss');

      if (this.project.has ('app/styles/_app-theme.scss'))
        files = files.filter (item => item !== '__root__/styles/_app-theme.scss');
    }

    return files;
  },

  afterInstall () {
    return installPackages (this, [
      {name: '@material/theme'}
    ]).then (() => {
      return installAddons (this, {
        packages: [
          {name: 'ember-cli-mdc-sass'}
        ],
        blueprintOptions: {
          save: true
        }
      })
    });
  }
};
