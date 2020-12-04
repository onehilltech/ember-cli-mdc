import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc chip checkmark', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{mdc-chip-checkmark}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#mdc-chip-checkmark}}
        template block text
      {{/mdc-chip-checkmark}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
