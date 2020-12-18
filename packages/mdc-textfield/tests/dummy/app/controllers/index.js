import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  validationMessages;

  @action
  alert () {
    alert ('Something was clicked');
  }
}
