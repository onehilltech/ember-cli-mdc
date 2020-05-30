/* globals mdc */

import Modifier from 'ember-modifier';
const { MDCLineRipple } = mdc.lineRipple;

/**
 * The base class for all modifier states. The ModifierState class uses the State
 * software design pattern. This helps us remove the unnecessary if-else, switch-case
 * statements that can result from the modifier being in different states.
 */
class ModifierState {
  didInstall () {

  }

  didReceiveArguments () {

  }

  willRemove () {

  }
}

/**
 * The not installed state of the modifier.
 */
class NotInstalled extends ModifierState { }

/**
 * The installed state of the modifier.
 */
class Installed extends ModifierState {
  modifier;
  lineRipple;
  active = false;

  constructor (modifier) {
    super ();

    this.modifier = modifier;
  }

  didInstall () {
    this.lineRipple = new MDCLineRipple (this.modifier.element);
    this.modifier.element.classList.add ('mdc-line-ripple');
  }

  didReceiveArguments () {
    const { rippleCenter, active } = this.modifier.args.named;

    if (rippleCenter) {
      this.lineRipple.setRippleCenter (rippleCenter);
    }

    if (active) {
      this.lineRipple.activate ();
      this.active = true;
    }
    else if (this.active) {
      this.lineRipple.deactivate ();
      this.active = false;
    }
  }
}

export default class MdcLineRippleModifier extends Modifier {
  _state = new NotInstalled ();

  didInstall () {
    this._state = new Installed (this);
    this._state.didInstall ();
  }

  didReceiveArguments () {
    this._state.didReceiveArguments ();
  }

  willRemove () {
    this._state.willRemove ();
  }
}
