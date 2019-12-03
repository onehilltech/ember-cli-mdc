import EmberObject from '@ember/object';
import SupportsSnackbarMixin from 'ember-cli-mdc-snackbar/mixins/supports-snackbar';
import { module, test } from 'qunit';

module('Unit | Mixin | supports-snackbar', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SupportsSnackbarObject = EmberObject.extend(SupportsSnackbarMixin);
    let subject = SupportsSnackbarObject.create();
    assert.ok(subject);
  });
});
