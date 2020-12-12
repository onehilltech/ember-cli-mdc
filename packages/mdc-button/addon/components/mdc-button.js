import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCRipple } = mdc.ripple;

export default class MdcButtonComponent extends Component {
  _button = null;

  get type () {
    return this.args.type;
  }

  createMaterialComponent (element) {
    return new MDCRipple (element);
  }
}