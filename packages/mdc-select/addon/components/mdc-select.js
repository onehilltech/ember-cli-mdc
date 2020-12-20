/* global mdc */

import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';

import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { action, get } from '@ember/object';

const { MDCSelect } = mdc.select;

function noOp () { }

export default class MdcSelectComponent extends Component {
  doCreateComponent (element) {
    return new MDCSelect (element);
  }

  get isOutlined () {
    return this.args.style === 'outlined';
  }

  @listener ('MDCSelect:change')
  change (ev) {
    // Pass control to the subclass.
    this.didChange (ev);

    // Notify the client the value has changed.
    const { detail: { value } } = ev;

    if (isEmpty (value)) {
      // There is no value selected. This means we are clearing the selection.
      (this.args.change || noOp) (null);
    }
    else {
      let selected = this.options.find (option => get (option, this.valueKey) === value);
      (this.args.change || noOp) (selected);
    }
  }

  didChange (ev) {

  }

  @action
  select (element, [value]) {

  }

  get options () {
    return A (this.args.options);
  }

  get labelId () {
    return guidFor (this);
  }

  get valueKey () {
    return this.args.valueKey || 'value';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }

  get disabledKey () {
    return this.args.disabledKey || 'disabled';
  }
}
