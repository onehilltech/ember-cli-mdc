import Component from 'ember-cli-mdc-base/component';

import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import { MDCSwitch } from '@material/switch';

export default class MdcSwitchComponent extends Component {
  @tracked
  _switchElement = null;

  doPrepareElement (element) {
    this._switchElement = element;
  }

  doCreateComponent (element) {
    return new MDCSwitch (element);
  }

  get id () {
    return guidFor (this);
  }

  @action
  click (ev) {
    this.dispatchEvent ('MdcSwitch:checked', { checked: this.component.selected });
  }
}
