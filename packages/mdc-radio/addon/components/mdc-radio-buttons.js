import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MdcRadioButtonsComponent extends Component {
  @action
  didInsert (element) {
    if (isPresent (this.args.value)) {
      this.select (element, this.args.value);
    }
  }

  update (element, [value]) {
    this.select (element, value);
  }

  select (element, value) {
    // Check the button that matches the specified value.
    const buttons = this.getButtons (element);
    const initial = buttons.find (button => button.value === `${value}`);

    if (isPresent (initial)) {
      initial.checked = true;
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
