import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { sort } from '@ember/object/computed';
import { A } from '@ember/array';

export default class IndexController extends Controller {
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
