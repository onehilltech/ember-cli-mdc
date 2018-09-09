import Mixin from '@ember/object/mixin'
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import { assert } from '@ember/debug';

const TYPOGRAPHY = [
  'headline1',
  'headline2',
  'headline3',
  'headline4',
  'headline5',
  'headline6',

  'subtitle1',
  'subtitle2',

  'body1',
  'body2',

  'caption',
  'button',

  'overline'
];

export default Mixin.create ({
  classNameBindings: ['mdcTypographyClassName'],

  typography: null,

  mdcTypographyClassName: computed ('typography', function () {
    const typography = this.get ('typography');

    if (isEmpty (typography)) {
      return null;
    }

    assert (`The typography must be one of the following values: ${TYPOGRAPHY}`, TYPOGRAPHY.includes (typography));
    return `mdc-typography--${typography}`;
  })
});