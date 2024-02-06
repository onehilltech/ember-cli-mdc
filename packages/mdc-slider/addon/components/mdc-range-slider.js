import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { tracked } from '@glimmer/tracking';

import { MDCSlider } from '@material/slider';

export default class MdcRangeSliderComponent extends Component {
  @tracked
  startValue;

  @tracked
  endValue;

  constructor () {
    super (...arguments);

    this.startValue = this.args.start.value || this.args.start.min;
    this.endValue = this.args.end.value || this.args.end.min;
  }

  doCreateComponent (element) {
    const inputs = element.querySelectorAll ('input');
    const start = inputs.item (0);
    const end = inputs.item (1);

    start.setAttribute ('value', `${this.startValue}`);
    end.setAttribute ('value', `${this.endValue}`);

    return new MDCSlider (element);
  }

  @listener ('MDCSlider:change')
  change (ev) {
    const { detail: { thumb, value } } = ev;
    this.setValue (thumb, value);
    this.notifyChange (ev);
  }

  notifyChange (ev) {
    const range = this.range;

    this.didChange (ev, range);
    this.dispatchEvent ('MdcRangeSlider:change', { range });
  }


  didChange (ev, range) {

  }

  setValue (thumb, value) {
    if (thumb === 1) {
      this.startValue = value;
    }
    else if (thumb === 2) {
      this.endValue = value;
    }
  }

  @listener ('MDCSlider:input')
  input (ev) {
    const { detail: { thumb, value } } = ev;
    this.setValue (thumb, value);
    this.notifyInput (ev);
  }

  notifyInput (ev) {
    const range = this.range;

    this.didInput (ev, range);
    this.dispatchEvent ('MdcRangeSlider:input', { range });
  }

  didInput (ev, range) {

  }

  get range () {
    return {
      start: this.startValue,
      end: this.endValue
    };
  }
}
