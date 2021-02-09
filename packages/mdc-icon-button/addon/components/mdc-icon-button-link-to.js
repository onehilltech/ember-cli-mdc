import LinkComponent from '@ember/routing/link-component';

import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

const { MDCRipple } = mdc.ripple;

export default LinkComponent.extend ({
  classNames: ['mdc-icon-button'],
  classNameBindings: ['iconClassName'],

  iconClassName: computed ('style', 'iconClass', function () {
    if (isPresent (this.iconClass)) {
      return this.iconClass;
    }
    else if (isPresent (this.style)) {
      return `material-icons-${dasherize (this.style)}`;
    }
    else {
      return 'material-icons';
    }
  }),

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
