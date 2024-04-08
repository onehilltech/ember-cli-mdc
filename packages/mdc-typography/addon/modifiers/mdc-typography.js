import Modifier from 'ember-modifier';
import { isPresent } from '@ember/utils';

/**
 * @class MdcTypographyModifier
 *
 * The class modifier for dynamically changing the typography.
 */
export default class MdcTypographyModifier extends Modifier {
  _currentClassName;

  modify (element, args, named) {
    const typography = args[0];

    if (isPresent (typography)) {
      const typographyClassName = `mdc-typography--${typography}`;

      if (typographyClassName !== this._currentClassName) {
        if (isPresent (this._currentClassName)) {
          element.classList.remove (this._currentClassName);
        }

        element.classList.add (typographyClassName);
        this._currentClassName = typographyClassName;
      }
    }
    else {
      if (isPresent (this._currentClassName)) {
        this.element.classList.remove (this._currentClassName);
      }

      this._currentClassName = null;
    }
  }

  willDestroy () {
    if (isPresent (this._currentClassName)) {
      this.element.classList.remove (this._currentClassName);
    }
  }
}
