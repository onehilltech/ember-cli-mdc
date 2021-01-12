import LinkComponent from '@ember/routing/link-component';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { MDCRipple } from '@material/ripple';

export default LinkComponent.extend ({
  _button: null,

  classNames: ['mdc-button'],
  classNameBindings: ['styleClassName'],

  styleClassName: computed (function () {
    return isPresent (this.style) ? `mdc-button--${this.style}` : '';
  }),

  didInsertElement () {
    this._super (...arguments);

    this._button = new MDCRipple (this.element);
  },

  willDestroyElement () {
    this._super (...arguments);

    if (isPresent (this._button)) {
      this._button.destroy ();
    }
  }
});
