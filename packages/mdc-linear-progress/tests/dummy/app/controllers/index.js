import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked
  started = false;

  @tracked
  count = 0;

  @action
  toggleProgress () {
    this.started = !this.started;
    this._doHeartbeat ();
  }

  _doHeartbeat () {
    if (this.started) {
      setTimeout (function (component) {
        component._updateProgress ();
        component._doHeartbeat ();
      }, 1000, this);
    }
  }

  _updateProgress () {
    this.count ++;
  }
}
