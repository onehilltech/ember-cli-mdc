/* global mdc */

import Component from 'ember-cli-mdc-base/component';
const { MDCFloatingLabel } = mdc.floatingLabel;

export default class MDCFloatingLabelComponent extends Component {
  didInsert (element) {
    let floatingLabel = new MDCFloatingLabel (element);
    this._mdcComponentCreated (floatingLabel);
  }
}
