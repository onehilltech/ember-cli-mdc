import Controller from '@ember/controller';

import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  fixed;

  @tracked
  dense;

  @tracked
  short;

  @tracked
  shortCollapsed;

  @action
  navigation () {
    alert ('Navigation button clicked!');
  }

  @action
  toggle (key, element) {
    let { target } = element;
    set (this, key, target.checked);
  }
}
