import Mixin from '@ember/object/mixin';

export default Mixin.create({
  snackbarPropertyName: 'snackbar',

  actions: {
    'app:snackbar' (opts) {
      this.controller.set (this.snackbarPropertyName, opts);
    }
  }
});
