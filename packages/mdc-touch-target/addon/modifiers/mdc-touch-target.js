import Modifier, { ModifierState } from 'ember-cli-mdc-base/modifier';
import { isPresent } from '@ember/utils';

const typeExp = /^mdc((?:-[A-Za-z]+)+)$/;

export default class MdcTouchTargetModifier extends Modifier {
  createInitialState (element, params, args) {
    const { wrap = false, hint } = args;

    this.wrap = wrap;
    this.hint = hint;

    if (this.wrap) {
      return new TouchWrapperState ();
    }
    else {
      return new NoTouchWrapperState  ();
    }
  }
}

class NoTouchWrapperState extends ModifierState {

}

/**
 * Modifier state for the touch wrapper.
 */
class TouchWrapperState extends ModifierState {
  _wrapper;

  didEnterState () {
    // Add a touch target wrapper to the modifier element.
    this._wrapper = document.createElement ('div');
    this._wrapper.classList.add ('mdc-touch-target-wrapper');

    this.element.parentNode.insertBefore (this._wrapper, this.element);
    this._wrapper.appendChild (this.element);

    if (isPresent (this.hint)) {
      // Add the mdc-X--touch class to the element.
      this.element.classList.add (`mdc-${this.hint}`);
    }
    else {
      const type = this.type;

      if (isPresent (type)) {
        this.element.classList.add (`mdc${type}--touch`);
      }
    }
  }

  didModify (element, _, args) {
    const { wrap = false } = args;

    if (!wrap) {
      this.changeState (new NoTouchWrapperState ());
    }
  }

  willExitState () {
    // Remove the wrapper from the DOM.
    const element = this._wrapper.firstChild;
    const parentNode = this._wrapper.parentNode;

    parentNode.insertBefore (element, this._wrapper);
    parentNode.removeChild (this._wrapper);
  }

  /**
   * Get the material component type.
   *
   * @return {string|null}
   */
  get type () {
    let classList = this.element.classList;

    for (let i = 0; i < classList.length; ++ i) {
      const className = classList[i];
      const found = className.match (typeExp);

      if (isPresent (found)) {
        // Always return index 1 since it has the format "-[type]".
        return found[1];
      }
    }

    return null;
  }
}

