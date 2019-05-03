import Component from '@ember/component';

import CardMixin from '../mixins/card';

import layout from '../templates/components/mdc-card';

export default Component.extend (CardMixin, {
  layout
});
