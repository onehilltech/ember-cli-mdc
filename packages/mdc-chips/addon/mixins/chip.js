import Mixin from '@ember/object/mixin';
import { and, not } from '@ember/object/computed';

export default Mixin.create ({
  classNames: ['mdc-chip'],
  classNameBindings: ['selected:mdc-chip--selected'],

  attributeBindings: ['tabindex'],

  tabindex: 0,

  /// The chip is selected.
  selected: false,

  /// The chip has an icon.
  icon: null,

  /// By default, the icon is a leading icon.
  trailing: false,

  /// Compute if the icon is leading.
  leading: not ('trailing'),

  hasLeadingIcon: and ('icon', 'leading'),
  hasTrailingIcon: and ('icon', 'trailing')
});
