/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

import { MDCCheckbox } from '@material/checkbox';

export default class MdcCheckboxComponent extends Component {
  @tracked
  _nativeControl = null;

  doPrepareElement (element) {
    this._nativeControl = element.querySelector ('.mdc-checkbox__native-control');
  }

  doCreateComponent (element) {
    return new MDCCheckbox (element);
  }

  get nativeControlId () {
    return isPresent (this._nativeControl) ? this._nativeControl.id : null;
  }
}
