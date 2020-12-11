/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCNotchedOutline } = mdc.notchedOutline;

export default class MdcNotchedOutlineComponent extends Component {
  @action
  didInsert (element) {
    this._notchedOutline = new MDCNotchedOutline (element);
    this._mdcComponentCreated (this._notchedOutline);
  }
}
