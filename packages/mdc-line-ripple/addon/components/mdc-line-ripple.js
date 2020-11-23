/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

const { MDCLineRipple } = mdc.lineRipple;

export default class MdcLineRippleComponent extends Component {
  _lineRipple = null;

  @action
  didInsert (element) {
    this._lineRipple = new MDCLineRipple (element);
    this._mdcComponentCreated (this._lineRipple);

    if (this.args.activate) {
      this._lineRipple.activate ();
    }

    let { rippleCenter } = this.args;
    if (isPresent (rippleCenter)) {
      this._lineRipple.setRippleCenter (rippleCenter);
    }
  }

  @action
  activation (element, [activate]) {
    if (activate) {
      this._lineRipple.activate ();
    } else {
      this._lineRipple.deactivate ();
    }
  }

  setRippleCenter (element, [rippleCenter]) {
    this._lineRipple.setRippleCenter (rippleCenter);
  }
}

