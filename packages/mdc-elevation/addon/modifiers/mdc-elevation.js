import Modifier from 'ember-cli-mdc-base/modifier';
import { isPresent } from '@ember/utils';

const MDC_CLASSNAME_ELEVATION_TRANSITION = 'mdc-elevation-transition';

export default class MdcElevationModifier extends Modifier {
  _currentElevationClassName;
  _hasTransition = false;

  modify (element, _, args) {
    super.modify (...arguments);

    const { elevation, transition = false } = args;

    if (transition && !this._hasTransition) {
      // The element does not have a transition class, so add one.
      element.classList.add (MDC_CLASSNAME_ELEVATION_TRANSITION);
      this._hasTransition = true;
    }
    else if (!transition && this._hasTransition) {
      // Remove the transition class name from the element.
      element.classList.remove (MDC_CLASSNAME_ELEVATION_TRANSITION);
      this._hasTransition = false;
    }

    if (isPresent (elevation)) {
      // Add elevation to the element list making sure to remove the old class name from
      // the element class list.

      if (isPresent (this._currentElevationClassName)) {
        element.classList.remove (this._currentElevationClassName);
      }

      this._currentElevationClassName = `mdc-elevation--z${elevation}`;
      element.classList.add (this._currentElevationClassName);
    }
    else {
      element.classList.remove ()
    }
  }
}
