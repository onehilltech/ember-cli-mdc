/* global mdc */

import Component from 'ember-cli-mdc-base/component';

import { MDCNotchedOutline } from '@material/notched-outline';

export default class MdcNotchedOutlineComponent extends Component {
  doCreateComponent (element) {
    return new MDCNotchedOutline (element);
  }
}
