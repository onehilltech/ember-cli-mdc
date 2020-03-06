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

    this._onKeyUpListener = this._onKeyUp.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this.element.addEventListener ('keyup', this._onKeyUpListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.element.removeEventListener ('keyup', this._onKeyUpListener);
  },

  _onKeyUpListener: null,

  _onKeyUp ({ target }) {
    const {value, maxLength = this.maxlength} = target;

    if (this.autoMoveToNext && maxLength > 0 && value.length >= maxLength) {
      let nextInput = getNextSibling (this.element, 'input');

      if (isPresent (nextInput)) {
        // Move the focus to the next element.
        nextInput.focus ();
      }
    }

    // The default HTML input ignores maxlength with type is number.
  }
});
