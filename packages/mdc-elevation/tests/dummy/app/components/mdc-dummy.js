import Component from '@ember/component';
import layout from '../templates/components/mdc-dummy';

import ElevationMixin from 'ember-cli-mdc-elevation/mixins/elevation';

export default Component.extend (ElevationMixin, {
  layout,

  classNames: ['mdc-dummy']
});
