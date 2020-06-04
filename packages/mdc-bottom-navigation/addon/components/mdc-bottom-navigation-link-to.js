import LinkComponent from '@ember/routing/link-component';
const { MDCRipple } = mdc.ripple;

export default class MdcBottomNavigationLinkComponent extends LinkComponent {
  classNames = ['mdc-bottom-navigation__button', 'mdc-bottom-navigation__link'];
  classNameBindings = ['active:mdc-bottom-navigation--active', 'label:mdc-bottom-navigation__button--with-label', 'horizontal:mdc-bottom-navigation__button--horizontal'];

  didInsertElement () {
    super.didInsertElement ();

    this._ripple = new MDCRipple (this.element);
    this._ripple.unbounded = true;
    this.element.setAttribute ('data-mdc-ripple-is-unbounded', '');
  }

  willDestroyElement () {
    super.willDestroyElement ();

    this._ripple.destroy ();
  }
}
