import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

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
    return this.args.step || 1;
  }

  get min () {
    return this.args.min || 0;
  }

  get max () {
    return this.args.max || 100;
  }

  get value () {
    return this.args.value || this.min;
  }

  @listener ('MDCSlider:change')
  change (ev) {
    this.didChange (ev);

    const { detail: slider } = ev;
    (this.args.change || noOp)(slider.value);
  }

  didChange (ev) {

  }

  @listener ('MDCSlider:input')
  input (ev) {
    this.didInput (ev);

    const { detail: slider } = ev;
    (this.args.input || noOp)(slider.value);
  }

  didInput (ev) {

  }

  @action
  setLimits (element, [min, max, step]) {
    if (isPresent (min)) {
      this.component.min = min;
    }

    if (isPresent (max)) {
      this.component.max = max;
    }

    if (isPresent (step)) {
      this.component.step = step;
    }
  }

  @action
  setValue (element, [value]) {
    if (this.component.value !== value) {
      this.component.setValue (value);
    }
  }

  get isRangeSlider () {
    return isPresent (this.args.rangeMin) && isPresent (this.args.rangeMax);
  }

  get isRangeMinDisabled () {
    return this.args.disabled || this.args.rangeMin.disabled;
  }

  get isRangeMaxDisabled () {
    return this.args.disabled || this.args.rangeMax.disabled;
  }
}
