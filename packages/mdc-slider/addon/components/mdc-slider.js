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
    const { detail: slider } = ev;
    this.notifyChange (slider.value);
  }

  didChange (ev, value) {

  }

  @listener ('MDCSlider:input')
  input (ev) {
    const { detail: slider } = ev;
    this.notifyInput (slider.value);
  }

  didInput (ev, value) {

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

  notifyInput (value) {
    this.didInput (value);
    this.dispatchEvent ('MdcSlider:input', { value });
  }

  notifyChange (value) {
    this.didChange (value);
    this.dispatchEvent ('MdcSlider:change', { value });
  }
}
