/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

const { MDCSwitch } = mdc.switch;

export default class MdcSwitchComponent extends Component {
  @tracked
  _switchElement = null;

  doPrepareElement (element) {
    this._switchElement = element;
  }

  doCreateComponent (element) {
    return new MDCSwitch (element);
  }

  get for () {
    return isPresent (this._switchElement) ? this._switchElement.querySelector ('.mdc-switch__native-control').id : null;
  }
}
