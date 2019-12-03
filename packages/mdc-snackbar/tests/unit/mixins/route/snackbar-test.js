import EmberObject from '@ember/object';
import RouteSnackbarMixin from 'ember-cli-mdc-snackbar/mixins/route/snackbar';
import { module, test } from 'qunit';

module('Unit | Mixin | route/snackbar', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let RouteSnackbarObject = EmberObject.extend(RouteSnackbarMixin);
    let subject = RouteSnackbarObject.create();
    assert.ok(subject);
  });
});
