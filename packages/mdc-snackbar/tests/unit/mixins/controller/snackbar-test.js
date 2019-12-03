import EmberObject from '@ember/object';
import ControllerSnackbarMixin from 'ember-cli-mdc-snackbar/mixins/controller/snackbar';
import { module, test } from 'qunit';

module('Unit | Mixin | controller/snackbar', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ControllerSnackbarObject = EmberObject.extend(ControllerSnackbarMixin);
    let subject = ControllerSnackbarObject.create();
    assert.ok(subject);
  });
});
