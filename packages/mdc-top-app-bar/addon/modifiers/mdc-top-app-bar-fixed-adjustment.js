import Modifier from 'ember-modifier';
import { isPresent } from '@ember/utils';

export default class MdcTopAppBarFixedAdjustmentModifier extends Modifier {
  _currentClassName;

  didReceiveArguments () {
    let { dense, prominent, short, disabled = false } = this.args.named;

    if (!disabled) {
      // The user does not want to disabled this adjustment. Apply the correct
      // adjustment based on the other named properties.

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
    else {
      // We need to remove the fixed adjustment from the element.
      if (isPresent (this._currentClassName)) {
        this.element.classList.remove (this._currentClassName);
        this._currentClassName = null;
      }
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
