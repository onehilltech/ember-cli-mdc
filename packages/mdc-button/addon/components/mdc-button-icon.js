import { Icon } from 'ember-cli-mdc-icon';

export default Icon.extend ({
  classNames: ['mdc-button__icon'],

  didInsertElement () {
    this._super (...arguments);

    this.element.setAttribute ('aria-hidden', true);
  }
});
