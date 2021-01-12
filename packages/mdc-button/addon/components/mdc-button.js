import Component from 'ember-cli-mdc-base/component';

import { MDCRipple } from '@material/ripple';
import { isPresent } from '@ember/utils';

export default class MdcButtonComponent extends Component {
  _button = null;

  get style () {
    const { style } = this.args;
    return isPresent (style) ? `mdc-button--${style}` : null;
  }

  doCreateComponent (element) {
    return new MDCRipple (element);
  }
}