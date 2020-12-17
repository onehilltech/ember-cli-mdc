import Component from 'ember-cli-mdc-base/component';

import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';
import { action } from '@ember/object';

function noOp () { }

const STYLES = ['filled', 'outlined'];

const { MDCTextField } = mdc.textfield;

export default class MdcTextfieldComponent extends Component {
  @service ('mdc-textfield-configurator')
  configurator;

  @tracked
  labelId;

  @tracked
  helperId;

  get style () {
    return this.args.style || this.configurator.style || 'filled';
  }

  get styleClassName () {
    let style = this.style;

    assert (`The textfield component supports the following styles: ${STYLES}`, STYLES.includes (style));

    return `mdc-text-field--${style}`;
  }

  doPrepareElement (element) {
    let { value } = this.args;

    if (isPresent (value)) {
      element.classList.add ('mdc-text-field--label-floating');
    }

    this.labelId = guidFor (this);
    this.helperId = `${guidFor (this)}__helper-text`;

    this._count = 0;
  }

  doCreateComponent (element) {
    return new MDCTextField (element);
  }

  @equal ('style', 'filled')
  filled;

  @equal ('style', 'outlined')
  outlined;

  @tracked
  _count = 0;

  get count () {
    return this.args.count || this._count;
  }

  get max () {
    return this.args.max || 0;
  }

  get helperLine () {
    let { characterCount = false } = this.args;
    return isPresent (this.helperText) || characterCount;
  }

  get helperText () {
    let { errorMessage, helperText } = this.args;
    return errorMessage || helperText;
  }

  get persistentHelperText () {
    let { persistentHelperText, errorMessage } = this.args;
    return isPresent (errorMessage) || persistentHelperText;
  }

  get leadingIconClick () {
    return this.args.leadingIconClick || noOp;
  }

  get trailingIconClick () {
    return this.args.trailingIconClick || noOp;
  }
}
