import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  alert () {
    alert ('Something was clicked');
  }
}
