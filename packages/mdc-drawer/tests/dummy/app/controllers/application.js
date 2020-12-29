import Controller from '@ember/controller';

import { equal } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked
  style;

  @tracked
  open = false;

  @action
  changeStyle (ev) {
    const { target } = ev;
    this.style = target.value;
  }

  @action
  toggleOpen () {
    this.open = !this.open;
  }
}
