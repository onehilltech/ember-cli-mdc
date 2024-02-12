import Controller from '@ember/controller';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  foodGroups;

  @tracked
  selected;

  @tracked
  value;

  @tracked
  actors;

  @tracked
  actor;

  @action
  change (ev) {
    const { detail: { option }} = ev;
    this.selected = option;
  }

  @action
  select () {
    this.value = this.foodGroups.objectAt (2);
  }

  @action
  clear () {
    this.value = null;
  }

  @action
  selectActor (ev) {
    const { detail: { option }} = ev;
    this.actor = option;
  }
}
