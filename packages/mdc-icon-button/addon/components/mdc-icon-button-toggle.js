/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener  from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';

const { MDCIconButtonToggle } = mdc.iconButton;

function noOp () {}

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
    //iconToggleButton.listen ('MDCIconButtonToggle:change', this.didChange.bind (this));

    this._mdcComponentCreated (iconToggleButton);

    iconToggleButton.on = this.isOn;
  }

  @action
  toggle (element, [on]) {
    this._mdcComponent.on = on;
  }

  @listener('MDCIconButtonToggle:change')
  didChange ({detail: isOn}) {
    // Update the on state to reflect the changes, then notify the action that
    // there was a change in state.

    this.changed (isOn);
  }

  get changed () {
    return this.args.changed || function () { return true };
  }
}