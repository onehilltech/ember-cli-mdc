import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  on;

  @tracked
  checked1;

  @action
  toggle (name, ev) {
    const { detail: { checked }} = ev;
    set (this, name, checked);
  }
}
