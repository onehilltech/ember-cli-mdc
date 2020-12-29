import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked
  headers;

  @tracked
  signals;

  @action
  rowSelectionChange () {

  }
}
