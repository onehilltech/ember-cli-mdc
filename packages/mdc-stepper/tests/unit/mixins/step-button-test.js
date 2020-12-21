import EmberObject from '@ember/object';
import StepButtonMixin from 'ember-cli-mdc-stepper/mixins/step-button';
import { module, test } from 'qunit';

module('Unit | Mixin | step button', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let StepButtonObject = EmberObject.extend(StepButtonMixin);
    let subject = StepButtonObject.create();
    assert.ok(subject);
  });
});
