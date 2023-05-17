import Controller from '@ember/controller';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  exited = false;

  @action
  toggleExited () {
    this.exited = !this.exited;
  }
}
