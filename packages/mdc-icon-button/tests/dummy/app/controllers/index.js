import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  on = true;

  @action
  toggle () {
    this.toggleProperty ('on');
  }

  @action
  onChanged ({ detail: { isOn }}) {
    this.on = isOn;
  }
}
