import Component from 'ember-cli-mdc-base/component';

import { isPresent } from '@ember/utils';

const { MDCRipple } = mdc.ripple;

export default class MdcButtonComponent extends Component {
  _button = null;

  get style () {
    const { style } = this.args;
    return isPresent (style) ? `mdc-button--${style}` : null;
  }

  createMaterialComponent (element) {
    return new MDCRipple (element);
  }
}