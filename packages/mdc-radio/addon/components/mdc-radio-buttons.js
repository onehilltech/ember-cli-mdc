import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MdcRadioButtonsComponent extends Component {
  @action
  changed (ev) {
    const { target } = ev;

    this.change (target.value);
  }

  get change () {
    return this.args.change || function () {}
  }
}
