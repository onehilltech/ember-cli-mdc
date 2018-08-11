import Component from '@ember/component';
import layout from '../templates/components/mdc-card-actions';

export default Component.extend({
  layout,

  classNames: ['mdc-card__actions'],

  classNameBindings: ['fullBleed:mdc-card__actions--full-bleed'],

  fullBleed: false,
});
