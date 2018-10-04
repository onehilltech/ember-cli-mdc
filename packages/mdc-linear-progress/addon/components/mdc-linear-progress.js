/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-linear-progress';

const { MDCLinearProgress } = mdc.linearProgress;

export default Component.extend({
  layout,

  classNames: ['mdc-linear-progress'],

  classNameBindings: [
    'indeterminate:mdc-linear-progress--indeterminate',
    'closed:mdc-linear-progress--closed',
    'reversed:mdc-linear-progress--reversed'
  ],

  indeterminate: false,

  closed: false,

  reversed: false,

  progress: 0,

  buffer: 1.0,

  _linearProgress: null,

  didUpdateAttrs () {
    this._super (...arguments);

    let { progress, buffer } = this.getProperties (['progress', 'buffer']);

    this._linearProgress.buffer = buffer;
    this._linearProgress.progress = progress;
  },

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('role', 'progressbar');

    this._linearProgress = new MDCLinearProgress (this.element);

    let { progress, buffer } = this.getProperties (['progress', 'buffer']);

    this._linearProgress.buffer = buffer;
    this._linearProgress.progress = progress;
  },

  willDestroyElement () {
    this._super (...arguments);

    this._linearProgress.destroy ();
  }
});
