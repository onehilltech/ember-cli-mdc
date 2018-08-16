import TextComponent from '../-private/text-component';

export default TextComponent.extend({
  tagName: 'blockquote',

  attributeBindings: ['cite']
});
