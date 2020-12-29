/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';
import { and } from '@ember/object/computed';

const { MDCSlider } = mdc.slider;

function noOp () {}

export default class MdcSliderComponent extends Component {
  doCreateComponent (element) {
    return new MDCSlider (element);
  }

  get min () {
    return this.args.min || 0;
  }

  get max () {
    return this.args.max || 100;
  }

  @listener ('MDCSlider:change')
  change (ev) {
    this.didChange (ev);

    let { detail: slider } = ev;
    (this.args.change || noOp)(slider.value);
  }

  didChange (ev) {

  }

  @listener ('MDCSlider:input')
  input (ev) {
    this.didInput (ev);

    let { detail: slider } = ev;
    (this.args.input || noOp)(slider.value);
  }

  didInput (ev) {

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
    return this.args.r || (0.38 * Math.min (this.width, this.height));
  }

  @action
  setLimits (element, [min, max, step]) {
    this.component.min = min;
    this.component.max = max;
    this.component.step = step;
  }

  @action
  setValue (element, [value]) {
    if (this.component.value !== value) {
      this.component.value = value;
    }
  }
}
