import Controller from '@ember/controller';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";

class Bag {
  @tracked
  value = 70;

  @tracked
  selected;
}

class Range {
  @tracked
  start;

  @tracked
  end;

  set (range) {
    this.start = range.start;
    this.end = range.end;
  }
}

export default class IndexController extends Controller {
  continuous;
  discrete;
  discreteWithTicks;
  continuousRange;
  continuousDiscreteRange;
  continuousDiscreteTicksRange;

  setup () {
    this.continuous = new Bag ();
    this.discrete = new Bag ();
    this.discreteWithTicks = new Bag ();

    this.continuousRange = new Range ();
    this.continuousDiscreteRange = new Range ();
    this.continuousDiscreteTicksRange = new Range ();
  }

  @action
  change (bag, ev) {
    const { target } = ev;

    bag.value = parseInt (target.value);
  }

  @action
  rangeChange (dst, ev) {
    const { detail: { range }} = ev;
    dst.set (range);
  }
}
