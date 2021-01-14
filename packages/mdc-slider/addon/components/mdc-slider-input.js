import TextField from '@ember/component/text-field';

export default TextField.extend ({
  classNames: ['mdc-slider__input'],

  attributeBindings: ['label:aria-label'],
});
