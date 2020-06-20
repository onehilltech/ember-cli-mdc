/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCIconButtonToggle } = mdc.iconButton;

function noOp () {}

export default class MdcIconButtonToggle extends Component {
  /// Parent action for the toggle event.
  //toggle: undefined,

  /// The material design component.
  //_iconToggleButton: null,
  //_changeEventListener: null,

  init () {
    this._super (...arguments);

    this._changeEventListener = this.didChange.bind (this);
  }

  @action
  didInsert (element) {
    // Set the attributes on the element.
    element.setAttribute ('aria-hidden', true);
    element.setAttribute ('aria-pressed', false);

    let iconToggleButton = new MDCIconButtonToggle (element);
    this._mdcComponentCreated (iconToggleButton);

    // Initialize the on button, then set the listener. We do not want the listener
    // being called just for initializing the button.
    const { on = false } = this.args;

    iconToggleButton.on = on;
  }

  @action
  didUpdateElement (element) {
    const { on = false } = this.args;

    if (on !== this._iconToggleButton.on) {
      this._iconToggleButton.on = on;
    }
  }

  didChange ({detail: {isOn}}) {
    // Update the on state to reflect the changes, then notify the action that
    // there was a change in state.

    this.set ('on', isOn);
    this.getWithDefault ('toggle', noOp) (isOn);
  }
}