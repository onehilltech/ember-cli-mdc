/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';

const { MDCLinearProgress } = mdc.linearProgress;

export default class MDCLinearProgressComponent extends Component {
  _linearProgress = null;

  @action
  didInsert (element) {
    element.setAttribute ('role', 'progressbar');

    this._linearProgress = new MDCLinearProgress (element);
    this._mdcComponentCreated (this._linearProgress);

    this._linearProgress.buffer = this.buffer;
    this._linearProgress.progress = this.progress;
  }

  @action
  updateProgress (element, [progress]) {
    this._linearProgress.progress = progress;
  }

  @action
  updateBuffer (element, [buffer]) {
    this._linearProgress.buffer = buffer;
  }

  get buffer () {
    return this.args.buffer || 1.0;
  }

  get progress () {
    return this.args.progress || 0;
  }
}
