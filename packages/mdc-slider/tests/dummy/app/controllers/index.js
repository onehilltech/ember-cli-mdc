import Controller from '@ember/controller';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";

class Bag {
  @tracked
  value = 70;

  @tracked
  selected;

  @tracked
  min = 0;

  @tracked
  max = 100;
}

export default class IndexController extends Controller {
  continuous;
  discrete;

  setup () {
    this.continuous = new Bag ();
    this.discrete = new Bag ();
  }

  @action
  change (bag, ev) {
    const { target } = ev;

    bag.value = parseInt (target.value);
  }
}
