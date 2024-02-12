import { Modifier } from 'ember-cli-mdc-base';
import { isPresent } from '@ember/utils';

export default class MdcTopAppBarFixedAdjustmentModifier extends Modifier {
  _currentClassName;

  modify (element, args, named) {
    const { fixed, dense, prominent, short, disabled = false } = named;

    if (!disabled) {
      // The user does not want to disabled this adjustment. Apply the correct
      // adjustment based on the other named properties.

      if (dense) {
        if (prominent) {
          this.applyClassName (element,'mdc-top-app-bar--dense-prominent-fixed-adjust');
        }
        else {
          this.applyClassName (element, 'mdc-top-app-bar--dense-fixed-adjust');
        }
      }
      else if (prominent) {
        this.applyClassName (element,'mdc-top-app-bar--prominent-fixed-adjust')
      }
      else if (short) {
        this.applyClassName (element, 'mdc-top-app-bar--short-fixed-adjust');
      }
      else {
        this.applyClassName (element, 'mdc-top-app-bar--fixed-adjust');
      }
    }
    else if (isPresent (this._currentClassName)) {
      // This fixed adjustment is disabled. We need to remove the fixed adjustment class
      // name from the element.

      element.classList.remove (this._currentClassName);
      this._currentClassName = null;
    }
  }

  applyClassName (element, className) {
    if (className !== this._currentClassName) {
      if (isPresent (this._currentClassName)) {
        element.classList.remove (this._currentClassName);
      }

      // Apply the classname to the class list, and cache it.
      element.classList.add (className);
      this._currentClassName = className;
    }
  }
}
