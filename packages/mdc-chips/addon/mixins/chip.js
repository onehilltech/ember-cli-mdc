import Mixin from '@ember/object/mixin';
import { equal, and } from '@ember/object/computed';

export default Mixin.create ({
  classNames: ['mdc-chip'],
  classNameBindings: ['selected:mdc-chip--selected'],

  attributeBindings: ['tabindex'],

  tabindex: 0,

  icon: null,

  selected: false,

  iconPosition: 'leading',

  leadingIcon: equal ('iconPosition', 'leading'),
  hasLeadingIcon: and ('icon', 'leadingIcon'),

  trailingIcon: equal ('iconPosition', 'trailing'),
  hasTrailingIcon: and ('icon', 'trailingIcon')
});
