import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MdcTabPanelComponent extends Component {
  @tracked
  active;

  @action
  activate () {
    this.active = true;
  }

  @action
  deactivate () {
    this.active = false;
  }
}
