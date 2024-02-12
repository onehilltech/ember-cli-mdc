import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { isPresent } from "@ember/utils";

export default class MdcProgressIndicatorComponent extends Component {
  doInitComponent (component) {
    const { indeterminate = false } = this.args;

    component.determinate = !indeterminate;
    component.progress = this.progress;
  }

  get min () {
    return this.args.min || 0;
  }

  get max () {
    return this.args.max || 1;
  }

  get value () {
    return this.args.value || 0;
  }

  get range () {
    return this.max - this.min;
  }

  get progress () {
    const { value, min, range } = this;
    return value >= min ? (value - min) / range : 0;
  }

  @action
  setProgress () {
    this.component.progress = this.progress;
  }

  @action
  setIndeterminate (element, [indeterminate]) {
    component.determinate = !indeterminate;
  }
}
