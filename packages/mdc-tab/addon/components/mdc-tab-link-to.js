import LinkComponent from '@ember/routing/link-component';
import layout from '../templates/components/mdc-tab';
import TabMixin from '../mixins/tab';
import { computed } from '@ember/object';

export default LinkComponent.extend (TabMixin, {
  layout,

  activeClass: 'mdc-tab--active',

  init () {
    this._super (...arguments);

    this.get ('params').unshift (this.get ('label'));
  }
});
