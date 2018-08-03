import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { dasherize } from '@ember/string';

export default Mixin.create ({
  classNameBindings: ['mdcThemeClassName'],

  /// The color them to apply to the component.
  theme: null,

  /// The class name that corresponds to the theme.
  mdcThemeClassName: computed ('theme', function () {
    const theme = this.get ('theme');
    return isPresent (theme) ? `mdc-theme--${dasherize (theme)}` : null;
  })
});
