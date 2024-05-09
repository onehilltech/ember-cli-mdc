import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';

export default class MdcRadioButtonsComponent extends Component {
  @action
  didInsert (element) {
    this.select (element, this.args.value);
  }

  @action
  update (element, [value]) {
    this.select (element, value);
  }

  select (element, value) {
    if (isNone (value)) {
      value = '';
    }

    // Check the button that matches the specified value.
    const buttons = this.getButtons (element);
    const selected = buttons.find (button => button.value === `${value}`);

    if (isPresent (selected)) {
      selected.checked = true;
    }
    else {
      buttons.forEach (button => button.checked = false);
    }
  }

  @action
  changed (ev) {
    const { target } = ev;

    this.change (target.value);
  }

  get change () {
    return this.args.change || function () {}
  }

  getButtons (element) {
    return Array.from (element.querySelectorAll ('input[type="radio"]'));
  }
}
