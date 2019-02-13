import EmberObject from '@ember/object';
import MdcSnackbarActionMixin from 'ember-cli-mdc-snackbar/mixins/mdc-snackbar-action';
import { module, test } from 'qunit';

module('Unit | Mixin | mdc-snackbar-action', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let MdcSnackbarActionObject = EmberObject.extend(MdcSnackbarActionMixin);
    let subject = MdcSnackbarActionObject.create();
    assert.ok(subject);
  });
});
