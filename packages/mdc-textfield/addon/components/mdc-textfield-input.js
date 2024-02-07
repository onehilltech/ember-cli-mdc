import TextField from '@ember/component/text-field';

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

export default TextField.extend ({
  classNames: ['mdc-text-field__input'],

  attributeBindings: ['label:aria-label']
});
