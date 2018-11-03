import EmberObject from '@ember/object';
import { not } from '@ember/object/computed';

/**
 * Utility class for storing the state of the step.
 */
export default EmberObject.extend ({
  valid: false,
  invalid: not ('valid'),

  reset () {
    this.set ('valid', false);
  }
});
