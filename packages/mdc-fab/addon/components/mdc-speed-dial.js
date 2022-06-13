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

  @action
  unexpand (ev) {
    const fab = closest (ev.target, '.mdc-speed-dial__action > .mdc-fab');

    if (isPresent (fab)) {
      this.expanded = false;
    }
  }

  get closeIcon () {
    return this.args.closeIcon || 'close';
  }
}
