import Mixin from '@ember/object/mixin';

import SurfaceTheme from './surface-theme';
import BackgroundTheme from './background-theme';
import TextTheme from './text-theme';

import { isPresent } from '@ember/utils';

export default Mixin.create (TextTheme, BackgroundTheme, SurfaceTheme, {
  /// @{ CSS Custom Properties

  /// Set the --mdc-theme-primary property.
  themePrimaryColor: null,

  /// Set the --mdc-theme-secondary property.
  themeSecondaryColor: null,

  /// @}

  didInsertElement () {
    this._super (...arguments);

    let { themePrimaryColor, themeSecondaryColor } = this.getProperties (['themePrimaryColor', 'themeSecondaryColor']);

    if (isPresent (themePrimaryColor))
      this.element.style.setProperty ('--mdc-theme-primary', themePrimaryColor);

    if (isPresent (themeSecondaryColor))
      this.element.style.setProperty ('--mdc-theme-secondary', themeSecondaryColor);
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let { themePrimaryColor, themeSecondaryColor } = this.getProperties (['themePrimaryColor', 'themeSecondaryColor']);

    if (isPresent (themePrimaryColor))
      this.element.style.setProperty ('--mdc-theme-primary', themePrimaryColor);
    else
      this.element.style.removeProperty ('--mdc-theme-primary');

    if (isPresent (themeSecondaryColor))
      this.element.style.setProperty ('--mdc-theme-secondary', themeSecondaryColor);
    else
      this.element.style.removeProperty ('--mdc-theme-secondary');
  }
});
