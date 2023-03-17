import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { Theme } from 'ember-cli-mdc-theme';
import Object from '@ember/object';

module('-internal | Mixins | Theme', function (hooks) {
  setupTest(hooks);

  test('should update the themeClassName', function (assert) {
    const MockObject = Object.extend(Theme);
    const mock = MockObject.create();

    mock.set('theme', 'primary');

    assert.deepEqual(mock.get('classNameBindings'), ['mdcThemeClassName']);
    assert.equal(mock.get('mdcThemeClassName'), 'mdc-theme--primary');
  });

  test('should dasherize the mdcThemeClassName', function (assert) {
    const MockObject = Object.extend(Theme);
    const mock = MockObject.create();

    mock.set('theme', 'primaryBg');

    assert.equal(mock.get('mdcThemeClassName'), 'mdc-theme--primary-bg');
  });
});
