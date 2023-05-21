import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  on = true;

  @action
  toggle () {
    this.on = !this.on;
  }

  @action
  change (ev) {
    const { detail: { isOn }} = ev;
    this.on = isOn;
  }

  @action
  click () {
    alert ('The icon was clicked...');
  }
}
