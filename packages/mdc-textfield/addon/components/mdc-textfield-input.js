import TextField from '@ember/component/text-field';

export default TextField.extend({
  classNames: ['mdc-text-field__input'],

  attributeBindings: ['label:aria-label']
});
