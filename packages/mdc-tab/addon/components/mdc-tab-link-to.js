import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/mdc-tab-link-to';

const { MDCTab } = mdc.tab;

function noOp () {}

export default LinkComponent.extend ({
  tagName: 'button',

  activeClass: 'mdc-tab--active',

  classNames: ['mdc-tab'],

  attributeBindings: ['active:aria-selected'],

  contentOnlyIndicator: false,

  iconIndicator: false,

  _tab: null,

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'tab');
    this.element.setAttribute ('tabindex', -1);

    this._tab = new MDCTab (this.element);
    this._tab.listen ('MDCTab:interacted', this.didInteract.bind (this));
  },

  willDestroyElement () {
    this._super (...arguments);

    this._tab.unlisten ('MDCTab:interacted', this.didInteract.bind (this));
    this._tab.destroy ();
  },

  didInteract () {
    this.getWithDefault ('interacted', noOp) ();
  }
});
