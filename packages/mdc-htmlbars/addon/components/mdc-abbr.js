import TextComponent from '../-private/text-component';

export default TextComponent.extend({
  tagName: 'abbr',

  attributeBindings: ['title']
});
