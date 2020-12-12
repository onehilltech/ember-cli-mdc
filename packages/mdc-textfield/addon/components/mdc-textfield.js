import Component from 'ember-cli-mdc-base/component';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { equal, oneWay, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

import { guidFor } from '@ember/object/internals';

const STYLES = ['filled', 'outlined'];

const { MDCTextField } = mdc.textfield;

export default class MdcTextfieldComponent extends Component {
  @service ('mdc-textfield-configurator')
  configurator;

  get style () {
    const { style = (this.configurator.style || 'filled') } = this.args;

    assert (`The textfield component supports the following styles: ${STYLES}`, STYLES.includes (style));

    return `mdc-text-field--${style}`;
  }

  @action
  didInsert (element) {
    this.prepareComponent (element);
    let textField = new MDCTextField (element);

    this._mdcComponentCreated (textField);
  }

  prepareComponent (element) {
    let labeledById = guidFor (element);
  }
}
