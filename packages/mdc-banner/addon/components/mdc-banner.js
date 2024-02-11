import { Component, listener } from 'ember-cli-mdc-base';
import { MDCBanner } from '@material/banner';
import {action} from "@ember/object";

export default class MdcBannerComponent extends Component {
  constructor () {
    super (...arguments);

    this._resizeListener = this._resize.bind (this);
    window.addEventListener ('resize', this._resizeListener);
  }

  willDestroy () {
    super.willDestroy ();

    window.removeEventListener ('resize', this._resizeListener);
  }

  doPrepareElement (element) {
    // Make sure the actions have the correct tag (i.e., primary and secondary).
    const actionsElement = element.querySelector ('.mdc-banner__actions');

    if (!!actionsElement) {
      // The last action is always listed as the primary action. The other actions
      // are the secondary actions.

      const actions = actionsElement.children;

      if (actions.length === 1) {
        // There is only one action, and it is the primary action.
        if (!actions[0].classList.contains ('mdc-banner__primary-action')) {
          actions[0].classList.add ('mdc-banner__primary-action');
        }
      }
      else if (actions.length === 2) {
        // There are two actions. The first action is the secondary action, and the second
        // action is the primary action.

        if (!actions[0].classList.contains ('mdc-banner__secondary-action')) {
          actions[0].classList.add ('mdc-banner__secondary-action');
        }

        if (!actions[1].classList.contains ('mdc-banner__primary-action')) {
          actions[1].classList.add ('mdc-banner__primary-action');
        }
      }
      else {
        console.warn ('The banner should only have 1 or 2 actions.')
      }
    }
  }

  doCreateComponent (element) {
    return new MDCBanner (element);
  }

  doInitComponent (component) {
    const { open = false } = this.args;

    if (open) {
      this._openOrCloseBanner (open);
    }
  }

  @action
  open (element, [open]) {
    this._openOrCloseBanner (open);
  }

  _openOrCloseBanner (open) {
    if (open && !this.component.isOpen) {
      this.component.open ();
    }
    else if (!open && this.component.isOpen) {
      this.component.close ();
    }
  }

  _resize () {
    this.component.layout ();
  }


  @listener ('MDCBanner:opening')
  opening () {
    this.dispatchEvent ('MdcBanner:opening', {});
  }

  @listener ('MDCBanner:opened')
  opened () {
    this.dispatchEvent ('MdcBanner:opened', {});
  }

  @listener ('MDCBanner:closing')
  closing (ev) {
    console.log (ev);

    const { detail: { reason }} = ev;
    this.dispatchEvent ('MdcBanner:closing', { reason });
  }

  @listener ('MDCBanner:closed')
  closed (ev) {
    console.log (ev);

    const { detail: { reason }} = ev;
    this.dispatchEvent ('MdcBanner:closed', { reason });
  }
}
