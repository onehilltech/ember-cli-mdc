/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCNotchedOutline } = mdc.notchedOutline;

export default class MdcNotchedOutlineComponent extends Component {
  doCreateComponent (element) {
    return new MDCNotchedOutline (element);
  }
}
