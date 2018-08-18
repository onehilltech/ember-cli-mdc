/* eslint-env node */

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
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-sass'}
      ],

      blueprintOptions: {
        save: true
      }
    });
  }
};
