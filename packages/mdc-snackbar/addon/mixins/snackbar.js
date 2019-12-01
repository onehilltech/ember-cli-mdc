import Mixin from '@ember/object/mixin';

export default Mixin.create({
  snackbarProperty: 'snackbar',

  actions: {
    snackbar (opts) {
      this.controller.set (this.get ('snackbarProperty'), opts);
    }
  }
});
