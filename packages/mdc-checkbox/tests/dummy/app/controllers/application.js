import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  checked = true;

  @tracked
  disabled = false;

  @action
  toggleDisabled () {
    this.disabled = !this.disabled;
  }
}
