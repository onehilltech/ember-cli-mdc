import Component from '@ember/component';
import layout from '../templates/components/mdc-linear-progress-bar';

export default Component.extend({
  layout,

  classNames: ['mdc-linear-progress__bar'],

  classNameBindings: ['primary:mdc-linear-progress__primary-bar:mdc-linear-progress__secondary-bar'],

  primary: true
});
