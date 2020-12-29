import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  displayMessage (message) {
    alert (message);
  }
}
