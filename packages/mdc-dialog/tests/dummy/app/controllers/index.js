import Controller from '@ember/controller';

import { action } from '@ember/object';
import { equal } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  open;

  @equal ('open', 'basic')
  showBasicDialog;

  @equal ('open', 'default')
  showDefaultDialog;

  @equal ('open', 'scrollable')
  showScrollableDialog;

  @equal ('open', 'stacked')
  showStackedButtonDialog;

  @action
  accept () {
    alert ('Accept clicked!');
  }

  @action
  close () {
    alert ('Cancel clicked!');
  }

  @action
  showDialog (key) {
    this.open = key;
  }
}
