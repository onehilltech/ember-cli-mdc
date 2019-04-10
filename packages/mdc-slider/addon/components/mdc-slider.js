/* global mdc */

import Component from '@ember/component';
import layout from '../templates/components/mdc-slider';

import { isPresent, isNone } from '@ember/utils';
import { and } from '@ember/object/computed';

const { MDCSlider } = mdc.slider;

function noOp () {}

export default Component.extend({
  layout,

  classNames: ['mdc-slider'],

  classNameBindings: ['discrete:mdc-slider--discrete', 'displayMarkers:mdc-slider--display-markers'],

  attributeBindings: [
    'tabindex',
    'role',
    'min:aria-valuemin',
    'max:aria-valuemax',
    'value:aria-valuenow',
    'label:aria-label',
    'disabled:aria-disabled',
    'step:data-step',
  ],

  role: 'slider',

  tabindex: 0,

  disabled: false,

  discrete: false,

  step: undefined,

  displayMarkers: false,

  markers: and ('discrete', 'displayMarkers'),

  /// Manually request the layout of the component. This attribute should be used when
  /// you can no longer slide the slider due to changes in the slider's layout. For example,
  /// the slider is initially rendered offscreen and then transitioned onscreen like in a
  /// menu.
  requestLayout: false,

  _slider: null,

  _changeListener: null,

  _inputListener: null,

  init () {
    this._super (...arguments);

    this._inputListener = this.didInput.bind (this);
    this._changeListener = this.didChange.bind (this);
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let {min, max, value, step} = this.getProperties (['min', 'max', 'value', 'step']);

    if (min !== this._slider.min) {
      this._slider.min = min;
    }

    if (max !== this._slider.max) {
      this._slider.max = max;
    }

    if (value !== this._slider.value) {
      this._slider.value = value;
    }

    if (step !== this._slider.step) {
      this._slider.step = step;
    }

    if (this.get ('requestLayout')) {
      this._slider.layout ();
    }
  },

  didInsertElement () {
    this._super (...arguments);

    this._createComponent ();
  },

  willDestroyElement () {
    this._super (...arguments);

    this._destroyComponent ();
  },

  didInput ({detail:slider}) {
    this.set ('value', slider.value);
  },

  didChange ({detail:slider}) {
    this.getWithDefault ('change', noOp) (slider.value);
  },

  _createComponent () {
    this._slider = new MDCSlider (this.element);
    this._slider.listen ('MDCSlider:input', this._inputListener);
    this._slider.listen ('MDCSlider:change', this._changeListener);
  },

  _destroyComponent () {
    this._slider.unlisten ('MDCSlider:input', this._inputListener);
    this._slider.unlisten ('MDCSlider:change', this._changeListener);
    this._slider.destroy ();
  }
});
