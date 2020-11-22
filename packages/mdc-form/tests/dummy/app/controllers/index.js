import Controller from '@ember/controller';

import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked
  email = null;

  @tracked
  password = null;

  @tracked
  valid = true;

  get disabled () {
    return !this.valid;
  }

  @action
  submit () {
    alert (`Email: ${this.email}\nPassword: ${this.password}`);
  }

  @action
  validity (valid) {
    this.valid = valid;
  }
}
