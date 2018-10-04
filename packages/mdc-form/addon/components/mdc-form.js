import Component from '@ember/component';
import layout from '../templates/components/mdc-form';

import { alias } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { debounce } from '@ember/runloop';

function noOp () {

}

export default Component.extend({
  layout,

  tagName: 'form',

  classNames: ['mdc-form'],

  attributeBindings: [
    // attributes
    'name',
    'method',
    'target',
    'action',
    'enctype',
    'acceptCharset:accept-charset',
    'autocomplete',
    'noValidate',
  ],

  encoding: alias ('enctype'),
  autoComplete: alias ('autocomplete'),

  validationDelay: 150,

  submitEventListener_: null,
  keypressEventListener_: null,

  init () {
    this._super (...arguments);

    this.submitEventListener_ = this.didSubmit.bind (this);
    this.keypressEventListener_ = this.didPressKey.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.element.addEventListener ('submit', this.submitEventListener_);
    this.element.addEventListener ('keypress', this.keypressEventListener_);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.element.removeEventListener ('submit', this.submitEventListener_);
    this.element.removeEventListener ('keypress', this.keypressEventListener_);
  },

  /**
   * The submit button was pressed. By default, we prevent the default action from
   * happening because form submission in EmberJS happens behind the scenes.
   *
   * @param ev
   */
  didSubmit (ev) {
    ev.preventDefault ();
  },

  /**
   * Continuously report the validity.
   */
  didPressKey () {
    let delay = this.get ('validationDelay');

    debounce (null, () => {
      let valid = this.element.reportValidity ();
      this.getWithDefault ('valid', noOp) (valid);
    }, delay);
  }
});
