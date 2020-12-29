import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked
  valueInput;

  get value () {
    return parseInt (this.valueInput);
  }

  @tracked
  minInput;

  get min () {
    return parseInt (this.minInput);
  }

  @tracked
  maxInput

  get max () {
    return parseInt (this.maxInput);
  }
}
