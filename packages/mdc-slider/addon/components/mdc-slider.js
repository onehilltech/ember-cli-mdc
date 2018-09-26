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

  step: null,

  displayMarkers: false,

  markers: and ('discrete', 'displayMarkers'),

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

    let {min, max, value} = this.getProperties (['min', 'max', 'value']);

    if (isPresent (min) && min !== this._slider.min) {
      this._slider.min = min;
    }

    if (isPresent (max) && max !== this._slider.max) {
      this._slider.max = max;
    }

    if (isPresent (value) && value !== this._slider.value) {
      this._slider.value = value;
    }
  },

  didInsertElement () {
    this._super (...arguments);

    this._slider = new MDCSlider (this.element);
    this._slider.listen ('MDCSlider:input', this._inputListener);
    this._slider.listen ('MDCSlider:change', this._changeListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._slider.unlisten ('MDCSlider:input', this._inputListener);
    this._slider.unlisten ('MDCSlider:change', this._changeListener);
    this._slider.destroy ();
  },

  didInput ({detail:slider}) {
    this.set ('value', slider.value);
  },

  didChange ({detail:slider}) {
    this.getWithDefault ('change', noOp) (slider.value);
  }
});
