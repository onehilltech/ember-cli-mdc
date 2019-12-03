import EmberObject from '@ember/object';
import ComponentSnackbarMixin from 'ember-cli-mdc-snackbar/mixins/component/snackbar';
import { module, test } from 'qunit';

module('Unit | Mixin | component/snackbar', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ComponentSnackbarObject = EmberObject.extend(ComponentSnackbarMixin);
    let subject = ComponentSnackbarObject.create();
    assert.ok(subject);
  });
});
