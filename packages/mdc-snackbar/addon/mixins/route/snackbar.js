import Mixin from '@ember/object/mixin';
import { set, get } from '@ember/object';

export default Mixin.create({
  snackbarPropertyName: 'snackbar',

  actions: {
    'app:snackbar' (opts) {
      const snackbarPropertyName = get (this, 'snackbarPropertyName');
      set (this.controller, snackbarPropertyName, opts);
    }
  }
});
