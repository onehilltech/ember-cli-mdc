/* globals mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

export default class MdcProgressIndicatorComponent extends Component {
  doInitComponent (component) {
    const { determinate = true } = this.args;

    component.determinate = determinate;
    component.progress = this.progress;
  }

  get min () {
    return this.args.min || 0;
  }

  get max () {
    return this.args.max || 1;
  }

  get value () {
    return this.args.value || 0;
  }

  get range () {
    return this.max - this.min;
  }

  get progress () {
    return (this.value - this.min) / this.range;
  }

  @action
  setProgress () {
    this.component.progress = this.progress;
  }

  @action
  setDeterminate (element, [determinate]) {
    component.determinate = determinate;
  }
}
