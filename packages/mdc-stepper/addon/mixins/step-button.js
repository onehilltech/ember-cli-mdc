import Mixin from '@ember/object/mixin';
import ButtonMixin from 'ember-cli-mdc-button/mixins/button';

export default Mixin.create (ButtonMixin, {
  classNames: ['mdc-step__button']
});
