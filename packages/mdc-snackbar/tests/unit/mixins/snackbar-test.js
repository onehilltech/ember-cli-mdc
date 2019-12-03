import EmberObject from '@ember/object';
import SnackbarMixin from 'ember-cli-mdc-snackbar/packages/mdc-snackbar/addon/mixins/app-snackbar';
import { module, test } from 'qunit';

module('Unit | Mixin | snackbar', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SnackbarObject = EmberObject.extend(SnackbarMixin);
    let subject = SnackbarObject.create();
    assert.ok(subject);
  });
});
