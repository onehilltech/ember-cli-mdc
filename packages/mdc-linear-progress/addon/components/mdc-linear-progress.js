/* global mdc */

import MdcProgressIndicatorComponent from 'ember-cli-mdc-progress-indicator';
import { action } from '@ember/object';

const { MDCLinearProgress } = mdc.linearProgress;

export default class MDCLinearProgressComponent extends MdcProgressIndicatorComponent {
  doCreateComponent (element) {
    return new MDCLinearProgress (element);
  }

  doInitComponent (component) {
    super.doInitComponent (component);

    component.buffer = this.buffer;
  }

  @action
  setBuffer (element, [buffer]) {
    this.component.buffer = (buffer - this.min) / this.range;
  }

  get buffer () {
    return this.args.buffer || 1.0;
  }
}
