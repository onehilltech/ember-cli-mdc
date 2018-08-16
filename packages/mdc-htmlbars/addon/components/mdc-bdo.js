import TextComponent from '../-private/text-component';
import layout from '../templates/components/mdc-div';

export default TextComponent.extend({
  layout,

  tagName: 'bdo',

  attributeBindings: ['dir'],

  // rtl or ltr
  dir: null
});
