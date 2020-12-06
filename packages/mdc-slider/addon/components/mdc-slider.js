/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';
import { and } from '@ember/object/computed';

const { MDCSlider } = mdc.slider;

function noOp () {}

export default class MdcSliderComponent extends Component {
  get min () {
    return this.args.min || 0;
  }

  get max () {
    return this.args.max || 100;
  }

  @action
  didInsert (element) {
    this._slider = new MDCSlider (element);
    this._mdcComponentCreated (this._slider);
  }

  @listener ('MDCSlider:change')
  change (ev) {
    this.didChange (ev);

    let { detail: slider } = ev;
    (this.args.change || noOp)(slider.value);
  }

  didChange () {

  }

  @listener ('MDCSlider:input')
  input (ev) {
    this.didInput (ev);

    let { detail: slider } = ev;
    (this.args.input || noOp)(slider.value);
  }

  didInput () {

  }

  get width () {
    return this.args.width || 21;
  }

  get height () {
    return this.args.height || 21;
  }

  get cx () {
    return this.width / 2;
  }

  get cy () {
    return this.height / 2;
  }

  get r () {
    return this.args.r || (0.75 * Math.min (this.cx, this.cy));
  }

  @action
  setLimits (element, [min, max, step]) {
    this._slider.min = min;
    this._slider.max = max;
    this._slider.step = step;
  }

  @action
  setValue (element, [value]) {
    if (this._slider.value !== value) {
      this._slider.value = value;
    }
  }
}
