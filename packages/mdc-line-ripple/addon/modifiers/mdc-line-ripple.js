import { Modifier, ModifierState } from 'ember-cli-mdc-base';
import { MDCLineRipple } from '@material/line-ripple';

/**
 * The installed state of the modifier.
 */
class Installed extends ModifierState {
  modifier;
  lineRipple;
  active = false;

  didEnterState () {
    this.lineRipple = new MDCLineRipple (this.modifier.element);
    this.modifier.element.classList.add ('mdc-line-ripple');
  }

  didModify () {
    const { rippleCenter, activate } = this.modifier.args.named;

    if (rippleCenter) {
      this.lineRipple.setRippleCenter (rippleCenter);
    }

    if (activate) {
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
  createInitialState () {
    return new Installed ();
  }
}
