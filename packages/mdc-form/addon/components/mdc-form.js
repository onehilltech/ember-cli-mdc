import Component from '@ember/component';
import layout from '../templates/components/mdc-form';

import { alias, not } from '@ember/object/computed';
import { isPresent, isNone } from '@ember/utils';
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
  checkValidityEventListener_: null,

  valid: false,
  invalid: not ('valid'),

  init () {
    this._super (...arguments);

    this.submitEventListener_ = this.didSubmit.bind (this);
    this.checkValidityEventListener_ = this.doCheckValidity.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.doCheckValidity ();

    this.element.addEventListener ('submit', this.submitEventListener_);
    this.element.addEventListener ('input', this.checkValidityEventListener_);
  },

  didUpdate () {
    this._super (...arguments);
    this.doCheckValidity ();
  },

  willDestroyElement () {
    this._super (...arguments);

    this.element.removeEventListener ('submit', this.submitEventListener_);
    this.element.removeEventListener ('input', this.checkValidityEventListener_);
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
  doCheckValidity () {
    let delay = this.get ('validationDelay');

    debounce (this, function () {
      if (this.isDestroyed || isNone (this.element)) {
        return;
      }

      let valid = this.element.checkValidity ();

      // Update the invalid state of the form. This will also components inside
      // the form to update its state based on the forms validity.
      this.set ('valid', valid);

      // Notify the parent of our state.
      this.getWithDefault ('change', noOp) (valid);
    }, delay);
  }
});
