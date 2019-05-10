import Mixin from '@ember/object/mixin';

export default Mixin.create ({
  classNames: ['mdc-chip'],
  classNameBindings: ['selected:mdc-chip--selected'],

  attributeBindings: ['tabindex'],

  tabindex: 0,

  /// The chip is selected.
  selected: false,

  iconLeading: null,

  iconTrailing: null
});
