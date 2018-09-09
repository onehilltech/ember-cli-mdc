import ButtonComponent from 'ember-cli-mdc-button/components/mdc-button';

export default ButtonComponent.extend ({
  classNameBindings: ['emphasize:mdc-dialog__action'],

  emphasize: false
});
