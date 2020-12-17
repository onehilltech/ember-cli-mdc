import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  activeTab = 1;

  @action
  activateTab (index) {
    this.activeTab = index;
  }
}
