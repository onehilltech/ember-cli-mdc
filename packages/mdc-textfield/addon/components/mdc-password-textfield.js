import Component from '@glimmer/component';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdcPasswordTextfieldComponent extends Component {
  @tracked
  showPassword = false;

  get visibleIcon () {
    return this.args.visibleIcon || 'visibility';
  }

  get invisibleIcon () {
    return this.args.invisibleIcon || 'visibility_off';
  }

  @action
  toggle () {
    this.showPassword = !this.showPassword;
  }
}
