import Component from '@ember/component';
import layout from '../templates/components/mdc-chip';

import { equal, and } from '@ember/object/computed';

export default Component.extend({
  layout,

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
  hasTrailingIcon: and ('icon', 'trailingIcon'),

  didUpdateAttrs () {
    this._super (...arguments);


  }
});
