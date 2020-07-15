import Component from '@ember/component';
import layout from '../templates/components/sa-component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['sa-outer-component'],

  layout,

  snackbar: service (),

  actions: {
    show () {
      this.snackbar.show ({message: 'Hello, Outer Component!'});
    }
  }
});
