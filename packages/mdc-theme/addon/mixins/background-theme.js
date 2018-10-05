import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';

import { assert } from '@ember/debug';

const THEME_BACKGROUND_VALUES = [
  'background',
  'primary',
  'secondary'
];

export default Mixin.create ({
  classNameBindings: [
    'mdcThemeBackgroundClassName'
  ],

  /**
   * Sets the background color to the selected style. The `themeBackground` attribute must
   * be one of the following values:
   *
   *  = "background"
   *  = "primary"
   *  = "secondary"
   */
  themeBackground: null,

  /// {@ CSS Custom Properties

  /**
   * Defines the CSS custom property --mdc-theme-background.
   */
  themeBackgroundColor: null,

  /// @}

  mdcThemeBackgroundClassName: computed ('themeBackground', function () {
    const themeBackground = this.get ('themeBackground');

    if (isEmpty (themeBackground)) {
      return null;
    }

    assert (`The themeBackground attribute must be one of the following values: ${THEME_BACKGROUND_VALUES}`, THEME_BACKGROUND_VALUES.includes (themeBackground));
    return  themeBackground === 'background' ? 'mdc-theme--background' : `mdc-theme--${themeBackground}-bg`;
  }),

  didInsertElement () {
    this._super (...arguments);

    let themeBackgroundColor = this.get ('themeBackgroundColor');

    if (isPresent (themeBackgroundColor)) {
      this.element.style.setProperty ('--mdc-theme-background', themeBackgroundColor);
    }
    else {
      this.element.style.removeProperty ('--mdc-theme-background');
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let themeBackgroundColor = this.get ('themeBackgroundColor');

    if (isPresent (themeBackgroundColor)) {
      this.element.style.setProperty ('--mdc-theme-background', themeBackgroundColor);
    }
    else {
      this.element.style.removeProperty ('--mdc-theme-background');
    }
  }
});
