/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCLinearProgress } = mdc.linearProgress;

export default class MDCLinearProgressComponent extends Component {
  doCreateComponent (element) {
    return new MDCLinearProgress (element);
  }

  doInitComponent (component) {
    component.buffer = this.buffer;
    component.progress = this.progress;
  }

  @action
  updateProgress (element, [progress]) {
    this.component.progress = progress;
  }

  @action
  updateBuffer (element, [buffer]) {
    this.component.buffer = buffer;
  }

  get buffer () {
    return this.args.buffer || 1.0;
  }

  get progress () {
    return this.args.progress || 0;
  }
}
