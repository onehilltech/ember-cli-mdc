import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import * as ponyfill from '@material/dom/ponyfill';

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

  @action
  close (ev) {
    const { target } = ev;
    const fab = ponyfill.closest (target, '.mdc-fab--mini');

    if (isPresent (fab)) {
      this.expanded = false;
    }
  }
}
