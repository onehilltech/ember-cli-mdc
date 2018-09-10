import Component from '@ember/component';
import TabMixin from '../mixins/tab';

import layout from '../templates/components/mdc-tab';

export default Component.extend (TabMixin, {
  layout,

  classNameBindings: ['active:mdc-tab--active'],

  active: false
});
