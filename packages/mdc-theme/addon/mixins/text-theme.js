import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { dasherize } from '@ember/string';

import { assert } from '@ember/debug';

const THEME_TEXT_STYLES = [
  'primary',
  'secondary',
  'disabled',
  'icon',
  'hint',
];

const THEME_VALUES = [
  'dark',
  'light'
];

const THEME_TEXT_VALUES = [
  'primary',
  'secondary',
  'onPrimary',
  'onSecondary',
  'onSurface'
];

export default Mixin.create ({
  classNameBindings: [
    'mdcThemeTextClassName',
    'mdcThemeClassName',
  ],

  /**
   * Sets the text color to the selected theme. The themeText must be one
   * of the following values:
   *
   * = primary
   * = secondary
   * = onPrimary
   * = onSecondary
   * = onSurface
   */
  themeText: null,

  mdcThemeTextClassName: computed ('themeText', function () {
    const themeText = this.get ('themeText');

    if (isEmpty (themeText)) {
      return null;
    }

    assert (`The themeText must be one of the following values: ${THEME_TEXT_VALUES}`, THEME_TEXT_VALUES.includes (themeText));
    return `mdc-theme--${ dasherize (themeText)}`;
  }),

  /**
   * Set the theme for the text style. The `theme` attribute must be one
   * of the following values:
   *
   * = dark
   * = light
   */
  theme: null,

  /**
   * Set the theme for the text style. The `theme` attribute must be one
   * of the following values:
   *
   * = primary
   * = secondary
   * = disabled
   * = icon
   * = hint
   */
  themeTextStyle: null,

  mdcThemeClassName: computed ('{theme,themeTextStyle}', function () {
    const {theme, themeTextStyle} = this.getProperties (['theme','themeTextStyle']);

    if (isEmpty (theme) || isEmpty (themeTextStyle)) {
      return null;
    }

    assert (`The theme attribute must be one of the following values: ${THEME_VALUES}`, THEME_VALUES.includes (theme));
    assert (`The themeTextStyle attribute must be one of the following values: ${THEME_TEXT_STYLES}`, THEME_TEXT_STYLES.includes (themeTextStyle));

    return `mdc-theme--text-${themeTextStyle}-on-${theme}`;
  })
});
