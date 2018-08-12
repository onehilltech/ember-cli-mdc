import TextArea from '@ember/component/text-area';
import TextSupport from '../mixins/text-support';

export default TextArea.extend (TextSupport, {
  fullWidth: null,

  didInsertElement () {
    this._super (...arguments);

    this.$wrapper.addClass ('mdc-text-field--textarea');
  },

  _applyStyling () {
    this.$wrapper.toggleClass ('mdc-text-field--fullwidth', this.getWithDefault ('fullWidth', false));
  },

  _hasLabel: true
});
