import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';

export default class IndexController extends Controller {
  @tracked
  selected;

  @tracked
  headers;

  @tracked
  signals;

  @tracked
  signalsSortDesc;

  @sort('signals', 'signalsSortDesc')
  signalsSorted;

  @action
  rowSelectionChange () {

  }

  @action
  sortSignals (sortKey) {
    this.signalsSortDesc.setObjects ([sortKey]);
  }
}
