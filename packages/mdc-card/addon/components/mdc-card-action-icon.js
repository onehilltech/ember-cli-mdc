import CardAction from '../mixins/card-action';
import IconButtonComponent from 'ember-cli-mdc-icon-button/components/mdc-icon-button';

export default IconButtonComponent.extend (CardAction, {
  classNames: ['mdc-card__action--icon'],

  attributeBindings: ['title'],

  title: null
});
