/* global mdc */

import Component from 'ember-cli-mdc-base/component';
const { MDCFloatingLabel } = mdc.floatingLabel;

export default class MDCFloatingLabelComponent extends Component {
  doCreateComponent (element) {
    return new MDCFloatingLabel (element);
  }
}
