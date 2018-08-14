import { Button } from 'ember-cli-mdc-button';

export default Button.extend ({
  classNameBindings: ['emphasize:mdc-dialog__action'],

  emphasize: false
});
