import LinkComponent from '@ember/routing/link-component';

import { isPresent } from '@ember/utils';
import { MDCRipple } from '@material/ripple';

export default LinkComponent.extend ({
  classNames: ['mdc-icon-button', 'material-icons'],

  _iconButtonRipple: null,

  didInsertElement () {
    this._super (...arguments);

    this._iconButtonRipple = new MDCRipple (this.element);
    this._iconButtonRipple.unbounded = true;
  },

  willDestroyElement () {
    this._super (...arguments);

    if (isPresent (this._iconButtonRipple)) {
      this._iconButtonRipple.destroy ();
    }
  }
});
