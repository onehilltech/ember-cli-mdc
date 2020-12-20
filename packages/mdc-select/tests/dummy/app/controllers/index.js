import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  foodGroups;

  @tracked
  selected;

  @action
  change (selected) {
    this.selected = selected;
  }
}
