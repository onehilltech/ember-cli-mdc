/* eslint-env node */

const path = require ('path');
const fs = require ('fs');

Array.prototype.remove = function (e) {
  const index = this.indexOf (e);

  if (index >= 0)
    this.splice (index, 1);

  return this;
};

module.exports = {
  description: '',

  normalizeEntityName () {
    // no-op since we're just adding dependencies
  },

  files () {
    const files = this._super (...arguments);

    if (this.isAddonProject ()) {
      // Remove the files that to not pertain to add-ons.
      files.remove ('__root__/styles/app.scss');

      // We do not need to continue overwrite the theme file.
      if (this.name === 'ember-cli-mdc-sass' || this.fileExistsSync ('addon/styles/addon.scss'))
        files.remove ('__root__/styles/addon.scss');
    }
    else {
      // Remove files that do not pertain to applications projects.
      files.remove ('__root__/styles/addon.scss');

      // Only include the theme file if it does not already exist.
      if (this.fileExistsSync ('app/styles/app.scss'))
        files.remove ('__root__/styles/app.scss');
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
  },

  isAddonProject () {
    return this.options.project.pkg.keywords && this.options.project.pkg.keywords.includes ('ember-addon');
  },

  fileExistsSync (file) {
    return fs.existsSync (path.resolve (this.options.project.root, file));
  }
};
