import IconComponent from 'ember-cli-mdc-icon/components/mdc-icon';

export default IconComponent.extend ({
  clickable: false,

  classNames: ['mdc-text-field__icon'],

  didRender () {
    this._super (...arguments);

    if (this.get ('clickable')) {
      // Make the icon clickable.
      if (!this.element.hasAttribute ('tabindex')) {
        this.element.setAttribute ('tabindex', 0);
      }

      if (!this.element.hasAttribute ('role')) {
        this.element.setAttribute ('role', 'button');
      }
    }
    else {
      // Make sure the icon is not clickable.
      if (this.element.hasAttribute ('tabindex')) {
        this.element.removeAttribute ('tabindex');
      }

      if (this.element.hasAttribute ('role')) {
        this.element.removeAttribute ('role');
      }
    }
  }
});
