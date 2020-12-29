import Modifier from 'ember-modifier';
import { isPresent } from '@ember/utils';

export default class MdcTopAppBarFixedAdjustmentModifier extends Modifier {
  _currentClassName;

  didReceiveArguments () {
    let { dense, prominent, short } = this.args.named;

    if (prominent) {
      this.applyClassName ('mdc-top-app-bar--prominent-fixed-adjust')
    }
    else if (dense) {
      if (prominent) {
        this.applyClassName ('mdc-top-app-bar--dense-prominent-fixed-adjust');
      }
      else {
        this.applyClassName ('mdc-top-app-bar--dense-fixed-adjust');
      }
    }
    else if (short) {
      this.applyClassName ('mdc-top-app-bar--short-fixed-adjust');
    }
    else {
      this.applyClassName ('mdc-top-app-bar--fixed-adjust');
    }
  }

  applyClassName (className) {
    if (className !== this._currentClassName) {
      if (isPresent (this._currentClassName)) {
        // Remove the current class name from the element.
        this.element.classList.remove (this._currentClassName);
      }

      // Apply the classname to the class list, and cache it.
      this.element.classList.add (className);
      this._currentClassName = className;
    }
  }
}
