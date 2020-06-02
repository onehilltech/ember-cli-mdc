import Component from 'ember-cli-mdc-base/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const { MDCRipple } = mdc.ripple;

export default class MdcButtonComponent extends Component {
  _button = null;

  @action
  didInsert (element) {
    this._button = new MDCRipple (element);
  }

  willDestroy () {
    this._button.destroy ();
  }
}