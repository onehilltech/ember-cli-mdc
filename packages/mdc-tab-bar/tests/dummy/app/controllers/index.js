import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  activeTab;

  @action
  activateTab () {
    this.activeTab = 1;
  }
}
