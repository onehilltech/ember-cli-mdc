/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';

const { MDCIconButtonToggle } = mdc.iconButton;

function noOp () { return true }

export default class MdcIconButtonToggle extends Component {
  get isOn () {
    return this.args.on || false;
  }

  @action
  didInsert (element) {
    // Set the attributes on the element.
    element.setAttribute ('aria-hidden', true);
    element.setAttribute ('aria-pressed', false);

    let iconToggleButton = new MDCIconButtonToggle (element);
    this._mdcComponentCreated (iconToggleButton);

    iconToggleButton.on = this.isOn;
  }

  @action
  toggle (element, [on]) {
    this._mdcComponent.on = on;
  }

  @listener('MDCIconButtonToggle:change')
  didChange (ev) {
    // Update the on state to reflect the changes, then notify the action that
    // there was a change in state.

    this.onChange (ev);
  }

  get onChange () { return this.args.onChange || noOp; }
}