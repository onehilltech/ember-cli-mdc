import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  transition;

  @action
  setTransition (ev) {
    const { target } = ev;
    this.transition = target.value === 'true';
  }
}
