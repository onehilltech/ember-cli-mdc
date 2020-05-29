import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';
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

  customPropertyBindings: [
    'themeOnPrimaryColor:--mdc-theme-on-primary',
    'themeOnSecondaryColor:--mdc-theme-on-primary',
    'themeOnSurfaceColor:--mdc-theme-on-surface',

    'themeTextPrimaryOnLightColor:--mdc-theme-text-primary-on-light',
    'themeTextSecondaryOnLightColor:--mdc-theme-text-secondary-on-light',
    'themeTextHintOnLightColor:--mdc-theme-text-hint-on-light',
    'themeTextIconOnLightColor:--mdc-theme-text-icon-on-light',
    'themeTextDisabledOnLightColor:--mdc-theme-text-disabled-on-light',

    'themeTextPrimaryOnDarkColor:--mdc-theme-text-primary-on-dark',
    'themeTextSecondaryOnDarkColor:--mdc-theme-text-secondary-on-dark',
    'themeTextHintOnDarkColor:--mdc-theme-text-hint-on-dark',
    'themeTextIconOnDarkColor:--mdc-theme-text-icon-on-dark',
    'themeTextDisabledOnDarkColor:--mdc-theme-text-disabled-on-dark',
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
    const themeText = this.themeText;

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
    const {theme, themeTextStyle} = this;

    if (isEmpty (theme) || isEmpty (themeTextStyle)) {
      return null;
    }

    assert (`The theme attribute must be one of the following values: ${THEME_VALUES}`, THEME_VALUES.includes (theme));
    assert (`The themeTextStyle attribute must be one of the following values: ${THEME_TEXT_STYLES}`, THEME_TEXT_STYLES.includes (themeTextStyle));

    return `mdc-theme--text-${themeTextStyle}-on-${theme}`;
  }),

  textColorOnPrimary: null,
  textColorOnSecondary: null,
  textColorOnSurface: null,

  didInsertElement () {
    this._super (...arguments);
    this._applyTextTheme ();
  },

  didUpdateAttrs () {
    this._super (...arguments);
    this._applyTextTheme ();
  },

  _applyTextTheme () {
    const {
      textColorOnPrimary,
      textColorOnSecondary,
      textColorOnSurface
    } = this;

    if (isPresent (textColorOnPrimary)) {
      this.element.style.setProperty ('--mdc-theme-on-primary', textColorOnPrimary);
    }

    if (isPresent (textColorOnSecondary)) {
      this.element.style.setProperty ('--mdc-theme-on-secondary', textColorOnSecondary);
    }

    if (isPresent (textColorOnSurface)) {
      this.element.style.setProperty ('--mdc-theme-on-surface', textColorOnSurface);
    }
  }
});
