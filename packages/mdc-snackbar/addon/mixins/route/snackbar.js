import Mixin from '@ember/object/mixin';

export default Mixin.create({
  snackbarProperty: 'snackbar',

  actions: {
    'app:snackbar' (opts) {
      this.controller.set (this.get ('snackbarProperty'), opts);
    }
  }
});
