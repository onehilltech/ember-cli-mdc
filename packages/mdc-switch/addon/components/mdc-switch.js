/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

const { MDCSwitch } = mdc.switch;

export default class MdcSwitchComponent extends Component {
  @tracked
  _switchElement = null;

  @action
  didInsert (element) {
    let mdcSwitch = new MDCSwitch (element);
    this._switchElement = element;

    this._mdcComponentCreated (mdcSwitch);
  }

  get for () {
    return isPresent (this._switchElement) ? this._switchElement.querySelector ('.mdc-switch__native-control').id : null;
  }

  get change () {
    return this.args.change || function () {};
  }
}
