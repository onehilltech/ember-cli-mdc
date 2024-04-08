import { assert }  from '@ember/debug';
import { MDCRipple } from '@material/ripple';
import { isPresent } from '@ember/utils';
import { Modifier } from "ember-cli-mdc-base";

const RIPPLE_SURFACE_COLOR_VALUES = ['primary', 'accent'];

export default class MdcRippleModifier extends Modifier {
  _ripple;
  _currentSurfaceColor;

  modify (element, _, args) {
    if (!this._ripple) {
      // Denote this is a ripple surface.
      this._ripple = new MDCRipple (element);
      element.classList.add ('mdc-ripple-surface');
    }

    const { unbounded = false, surfaceColor } = args;
    
    // For some reason, the unbound configuration only works when you set both the css and
    // data attribute accordingly.

    this._ripple.unbounded = unbounded;

    if (unbounded) {
      element.setAttribute ('data-mdc-ripple-is-unbounded', '');
    }
    else {
      element.removeAttribute ('data-mdc-ripple-is-unbounded');
    }

    if (isPresent (surfaceColor)) {
      assert (
        `The color must be one of the following values: ${RIPPLE_SURFACE_COLOR_VALUES}`,
        RIPPLE_SURFACE_COLOR_VALUES.includes (surfaceColor)
      );

      // Set the color for the ripple. We have already validate the color, so we can just generate the
      // correct class name for the ripple color.

      if (this._currentSurfaceColor) {
        element.classList.remove (this._currentSurfaceColor);
      }

      this._currentSurfaceColor = `mdc-ripple-surface--${surfaceColor}`;
      element.classList.add (this._currentSurfaceColor);
    }
  }

  willDestroy () {
    if (!!this._ripple) {
      // Remove the color from the element, and destroy the component.

      if (this._currentSurfaceColor) {
        this.element.classList.remove (this._currentSurfaceColor);
      }

      this._ripple.destroy ();
    }
  }
}
