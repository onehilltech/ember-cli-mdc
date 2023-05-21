/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { MDCIconButtonToggle } from '@material/icon-button';

function noOp () { return true }

export default class MdcIconButtonToggle extends Component {
  get isOn () {
    return this.args.isOn || false;
  }

  doCreateComponent (element) {
    return new MDCIconButtonToggle (element);
  }

  doInitComponent (component) {
    component.on = this.isOn;
  }

  @action
  toggle (element, [on]) {
    this.component.on = on;
  }

  @listener('MDCIconButtonToggle:change')
  change (ev) {
    this.didChange (ev);
    this.dispatchEvent ('MdcIconButtonToggle:change', ev.detail);
  }

  didChange (ev) {

  }
}