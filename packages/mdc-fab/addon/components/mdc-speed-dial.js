import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import { closest } from '@material/dom/ponyfill';

export default class MdcSpeedDialComponent extends Component {
  @tracked
  expanded;

  @action
  expand () {
    this.expanded = !this.expanded;
  }

  get closeIcon () {
    return this.args.closeIcon || 'close';
  }
}
