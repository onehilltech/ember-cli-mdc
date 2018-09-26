import IconComponent from 'ember-cli-mdc-icon/components/mdc-icon';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default IconComponent.extend ({
  classNames: ['mdc-chip__icon'],

  classNameBindings: ['leading:mdc-chip__icon--leading:mdc-chip__icon--trailing'],

  leading: true,

  attributeBindings: ['tabindex', 'role']
});
