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
      files.remove ('__root__/styles/_app-theme.scss');

      if (this.fileExistsSync ('tests/dummy/app/styles/_app-theme.scss'))
        files.remove ('tests/dummy/app/styles/_app-theme.scss');
    }
    else {
      // Remove files that do not pertain to applications projects.
      files.remove ('tests/dummy/app/styles/_app-theme.scss');

      if (this.fileExistsSync ('app/styles/_app-theme.scss'))
        files.remove ('__root__/styles/_app-theme.scss');
    }

    return files;
  },

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-mdc-sass'}
      ]
    }).then (() => {
      return this.addPackagesToProject ([
        {name: '@material/theme'},
      ]);
    });
  },

  isAddonProject () {
    return this.options.project.pkg.keywords && this.options.project.pkg.keywords.includes ('ember-addon');
  },

  fileExistsSync (file) {
    return fs.existsSync (path.resolve (this.options.project.root, file));
  }
};
