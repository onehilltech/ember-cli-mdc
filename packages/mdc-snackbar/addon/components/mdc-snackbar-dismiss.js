import IconButton from 'ember-cli-mdc-icon-button/components/mdc-icon-button';

import { isEmpty } from '@ember/utils';

export default IconButton.extend({
  classNames: ['mdc-snackbar__dismiss'],

  init () {
    this._super (...arguments);

    let params = this.get ('params');

    if (isEmpty (params)) {
      this.set ('params', ['close']);
    }
  }
});
