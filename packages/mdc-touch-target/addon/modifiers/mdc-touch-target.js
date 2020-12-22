import Modifier, { ModifierState } from 'ember-cli-mdc-base/modifier';
import { isPresent } from '@ember/utils';

const typeExp = /^mdc((?:-[A-Za-z]+)+)$/;

export default class MdcTouchTargetModifier extends Modifier {
  createInitialState () {
    const { named: { wrap = false }} = this.args;

    if (wrap) {
      return new TouchWrapperState ();
    }
    else {
      return super.createInitialState ();
    }
  }

  didInstall () {
    super.didInstall ();

    const { named: { hint }} = this.args;

    // Add the mdc-X--touch class to the element.
    let className = `${isPresent (hint) ? `mdc-${hint}` : `mdc${this.type}`}--touch`;
    this.element.classList.add (className);
  }

  get type () {
    let classList = this.element.classList;

    for (let i = 0; i < classList.length; ++ i) {
      let className = classList[i];
      let found = className.match (typeExp);

      if (isPresent (found)) {
        return found[1];
      }
    }
  }
}

/**
 * Modifier state for the touch wrapper.
 */
class TouchWrapperState extends ModifierState {
  _wrapper;

  didInstall () {
    // Add a touch target wrapper to the modifier element.
    let element = this.modifier.element;

    this._wrapper = document.createElement ('div');
    this._wrapper.classList.add ('mdc-touch-target-wrapper');

    element.parentNode.insertBefore (this._wrapper, element);
    this._wrapper.appendChild (element);
  }

  willRemove () {
    // Remove the wrapper from the DOM.
    let element = this._wrapper.firstChild;
    let parentNode = this._wrapper.parentNode;

    parentNode.insertBefore (element, this._wrapper);
    parentNode.removeChild (this._wrapper);
  }
}

