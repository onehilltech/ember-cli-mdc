/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import { MDCLineRipple } from '@material/line-ripple';

export default class MdcLineRippleComponent extends Component {
  doCreateComponent (element) {
    return new MDCLineRipple (element);
  }

  doInitComponent (component) {
    let { activate, rippleCenter } = this.args;

    if (activate) {
      component.activate ();
    }

    if (isPresent (rippleCenter)) {
      component.setRippleCenter (rippleCenter);
    }
  }

  @action
  activation (element, [activate]) {
    if (activate) {
      this.component.activate ();
    }
    else {
      this.component.deactivate ();
    }
  }

  @action
  setRippleCenter (element, [rippleCenter]) {
    this.component.setRippleCenter (rippleCenter);
  }
}

