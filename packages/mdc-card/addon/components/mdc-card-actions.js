import Component from '@ember/component';

export default Component.extend({
  classNames: ['mdc-card__actions'],

  classNameBindings: ['fullBleed:mdc-card__actions--full-bleed'],

  fullBleed: false,
});
