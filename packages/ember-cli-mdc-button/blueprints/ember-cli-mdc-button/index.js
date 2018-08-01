/* eslint-env node */
module.exports = {
  description: '',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall () {
    return this.addPackagesToProject ([
      {name: '@material/button'},
    ]).then (() => {
      return this.addAddonsToProject({
        packages: [
          {name: 'ember-cli-sass'}
        ]
      });
    });
  }
};
