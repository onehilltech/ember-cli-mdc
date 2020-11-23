/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

let { MDCCheckbox } = mdc.checkbox;

export default class MdcCheckboxComponent extends Component {
  @tracked
  _nativeControl = null;

  @action
  didInsert (element) {
    this._nativeControl = element.querySelector ('.mdc-checkbox__native-control');
    let checkbox = new MDCCheckbox (element);

    this._mdcComponentCreated (checkbox);
  }

  get for () {
    return isPresent (this._nativeControl) ? this._nativeControl.id : null;
  }
}
