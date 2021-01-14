/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action } from '@ember/object';

import { MDCSlider } from '@material/slider';

function noOp () {}

export default class MdcSliderComponent extends Component {
  doCreateComponent (element) {
    let input = element.querySelector ('input');
    input.setAttribute ('value', `${this.value}`);

    return new MDCSlider (element);
  }

  get name () {
    return this.args.name || 'volume';
  }

  get step () {
    const { step = 1 } = this.args;
    return step;
  }

  get min () {
    let { min = 0 } = this.args;
    return min;
  }

  get max () {
    let { max = 100 } = this.args;
    return max;
  }

  get value () {
    let { value = this.min } = this.args;
    return value;
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
