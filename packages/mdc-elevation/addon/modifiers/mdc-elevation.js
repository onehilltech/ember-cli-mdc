import Modifier from 'ember-cli-mdc-base/modifier';
import { isPresent } from '@ember/utils';

const MDC_CLASSNAME_ELEVATION_TRANSITION = 'mdc-elevation-transition';

export default class MdcElevationModifier extends Modifier {
  _currentElevationClassName;
  _hasTransition = false;

  didReceiveArguments () {
    let { elevation, transition = false } = this.args.named;

    if (transition && !this._hasTransition) {
      // The element does not have a transition class, so add one.
      this.element.classList.add (MDC_CLASSNAME_ELEVATION_TRANSITION);
      this._hasTransition = true;
    }
    else if (!transition && this._hasTransition) {
      // Remove the transition class name from the element.
      this.element.classList.remove (MDC_CLASSNAME_ELEVATION_TRANSITION);
      this._hasTransition = false;
    }

    if (isPresent (elevation)) {
      // Add elevation to the element list making sure to remove the old class name from
      // the element class list.

      if (isPresent (this._currentElevationClassName)) {
        this.element.classList.remove (this._currentElevationClassName);
      }

      this._currentElevationClassName = `mdc-elevation--z${elevation}`;
      this.element.classList.add (this._currentElevationClassName);
    }
    else {
      this.element.classList.remove ()
    }
  }
}
