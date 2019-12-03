import Mixin from '@ember/object/mixin';

export default Mixin.create({
  snackbar (opts) {
    this.send ('app:snackbar', opts);
  },
});
