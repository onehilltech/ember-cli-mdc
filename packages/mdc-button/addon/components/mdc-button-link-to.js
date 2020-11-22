import LinkComponent from '@ember/routing/link-component';
import { isPresent } from '@ember/utils';

const { MDCRipple } = mdc.ripple;

export default class MdcButtonLinkComponent extends LinkComponent {
  _button = null;

  classNames = ['mdc-button'];
  classNameBindings = Object.freeze (['styleClassName']);

  get styleClassName () {
    return isPresent (this.style) ? `mdc-button--${this.style}` : '';
  }

  didInsertElement () {
    super.didInsertElement ();

    this._button = new MDCRipple (this.element);
  }

  didReceiveAttrs () {
    super.didReceiveAttrs ();
  }

  willDestroyElement () {
    super.willDestroyElement ();

    this._button.destroy ();
  }
}
