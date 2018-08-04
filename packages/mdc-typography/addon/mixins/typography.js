import Mixin from '@ember/object/mixin'
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

export default Mixin.create ({
  classNameBindings: ['mdcTypographyClassName'],

  typography: null,

  mdcTypographyClassName: computed ('typography', function () {
    const typography = this.get ('typography');
    return isPresent (typography) ? `mdc-typography--${typography}` : null;
  })
});