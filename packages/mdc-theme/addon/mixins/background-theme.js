import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { assert } from '@ember/debug';

const THEME_BACKGROUND_VALUES = [
  'background',
  'primary',
  'secondary'
];

export default Mixin.create ({
  customPropertyBindings: [
    'themeBackgroundColor:--mdc-theme-background'
  ],

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

  mdcThemeBackgroundClassName: computed ('themeBackground', function () {
    const themeBackground = this.themeBackground;

    if (isEmpty (themeBackground)) {
      return null;
    }

    assert (`The themeBackground attribute must be one of the following values: ${THEME_BACKGROUND_VALUES}`, THEME_BACKGROUND_VALUES.includes (themeBackground));
    return  themeBackground === 'background' ? 'mdc-theme--background' : `mdc-theme--${themeBackground}-bg`;
  })
});
