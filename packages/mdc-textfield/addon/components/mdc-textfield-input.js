import TextField from '@ember/component/text-field';
import { isEmpty, isPresent } from '@ember/utils';

const getNextSibling = function (elem, selector) {
  // Get the next sibling element
  let sibling = elem.nextElementSibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop

  while (sibling) {
    if (sibling.matches (selector)) {
      return sibling;
    }

    sibling = sibling.nextElementSibling
  }
};

export default TextField.extend({
  classNames: ['mdc-text-field__input'],

  attributeBindings: ['label:aria-label'],

  /// Automatically move to the next input in the parent.
  autoMoveToNext: true,

  init () {
    this._super (...arguments);

    this._moveToNextInputListener = this._moveToNextInput.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.element.addEventListener ('keyup', this._moveToNextInputListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.element.removeEventListener ('keyup', this._moveToNextInputListener);
  },

  _moveToNextInputListener: null,

  _moveToNextInput ({ target }) {
    const {value, maxLength} = target;

    if (this.autoMoveToNext && isPresent (maxLength) && value.length >= maxLength) {
      let nextInput = getNextSibling (this.element, 'input');

      if (isPresent (nextInput)) {
        nextInput.focus ();
      }
    }
  }
});
