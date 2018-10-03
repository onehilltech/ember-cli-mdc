import Checkbox from '@ember/component/checkbox';

export default Checkbox.extend({
  classNames: ['mdc-checkbox__native-control'],

  attributeBindings: ['form']
});
