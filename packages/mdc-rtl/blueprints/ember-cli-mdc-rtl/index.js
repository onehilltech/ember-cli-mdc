/* eslint-env node */
module.exports = {
  description: '',

  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return Promise.all ([
      this.addAddonsToProject ({
        packages: [
          {name: 'ember-cli-mdc-sass'},
        ]
      }),
      this.addPackagesToProject ([
        {name: '@material/rtl'},
      ])
    ]);
  }
};
