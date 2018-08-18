import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { assert } from '@ember/debug';

const THEME_BACKGROUND_COLORS = [
  'background',
  'primary',
  'secondary'
];

export default Mixin.create ({
  classNameBindings: [
    'mdcThemeBackgroundColorClassName'
  ],

  /**
   * Sets the background color to the selected style. The `themeBackgroundColor` attribute must
   * be one of the following values:
   *
   *  = background
   *  = primary
   *  = secondary
   */
  themeBackgroundColor: null,

  mdcThemeBackgroundColorClassName: computed ('themeBackgroundColor', function () {
    const themeBackgroundColor = this.get ('themeBackgroundColor');

    if (isEmpty (themeBackgroundColor)) {
      return null;
    }

    assert (`The themeBackgroundColor attribute must be one of the following values: ${THEME_BACKGROUND_COLORS}`, THEME_BACKGROUND_COLORS.includes (themeBackgroundColor));
    return  themeBackgroundColor === 'background' ? 'mdc-theme--background' : `mdc-theme--${themeBackgroundColor}-bg`;
  })
});
