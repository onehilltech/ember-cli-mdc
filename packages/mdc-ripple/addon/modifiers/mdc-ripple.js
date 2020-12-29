/* globals mdc */

import Modifier from 'ember-modifier';
import { assert }  from '@ember/debug';

const { MDCRipple } = mdc.ripple;

const RIPPLE_SURFACE_COLOR_VALUES = ['primary', 'accent'];

export default class MdcRippleModifier extends Modifier {
  _ripple;
  _currentSurfaceColor;

  didReceiveArguments () {
    if (!this._ripple) {
      // Denote this is a ripple surface.
      this._ripple = new MDCRipple (this.element);
      this.element.classList.add ('mdc-ripple-surface');
    }

    let { unbounded = false, surfaceColor } = this.args.named;
    
    // For some reason, the unbound configuration only works when you set both the css and
    // data attribute accordingly.

    this._ripple.unbounded = unbounded;

    if (unbounded)
      this.element.setAttribute ('data-mdc-ripple-is-unbounded', '');
    else
      this.element.removeAttribute ('data-mdc-ripple-is-unbounded');

    if (surfaceColor) {
      assert (`The color must be one of the following values: ${RIPPLE_SURFACE_COLOR_VALUES}`, RIPPLE_SURFACE_COLOR_VALUES.includes (surfaceColor));

      // Set the color for the ripple. We have already validate the color, so we can just generate the
      // correct class name for the ripple color.

      if (this._currentSurfaceColor) {
        this.element.classList.remove (this._currentSurfaceColor);
      }

      this._currentSurfaceColor = `mdc-ripple-surface--${surfaceColor}`;
      this.element.classList.add (this._currentSurfaceColor);
    }
  }

  willRemove () {
    if (!!this._ripple) {
      // Remove the color from the element, and destroy the component.

      if (this._currentSurfaceColor) {
        this.element.classList.remove (this._currentSurfaceColor);
      }

      this._ripple.destroy ();
    }
  }
}
