import IconButton from 'ember-cli-mdc-icon-button/components/mdc-icon-button';

export default IconButton.extend({
  classNames: ['mdc-top-app-bar__action-item'],

  attributeBindings: ['label:aria-label'],

  label: null
});
