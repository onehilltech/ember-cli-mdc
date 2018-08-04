import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create ({
  classNameBindings: ['mdcElevationClassName', 'elevationTransition:mdc-elevation-transition'],

  mdcElevationClassName: computed ('elevation', function () {
    const elevation = this.get ('elevation');
    return isPresent (elevation) ? `mdc-elevation--z${elevation}` : null;
  }),

  elevation: null
});
