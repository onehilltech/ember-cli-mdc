import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { Elevation } from 'ember-cli-mdc-elevation';
import Object from '@ember/object';

module ('-internal | Mixins | Elevation', function (hooks) {
  setupTest (hooks);

  test ('should update the mdcElevationClassName', function (assert) {
    const MockObject = Object.extend (Elevation);

    const mock = MockObject.create ();
    assert.deepEqual (mock.get ('classNameBindings'), ['mdcElevationClassName', 'elevationTransition:mdc-elevation-transition']);

    mock.set ('elevation', '4');

    assert.equal ('mdc-elevation--z4', mock.get ('mdcElevationClassName'));
  });
});