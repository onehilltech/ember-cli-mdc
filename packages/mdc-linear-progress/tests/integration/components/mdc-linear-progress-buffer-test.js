import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-linear-progress-buffer', 'Integration | Component | mdc linear progress buffer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-linear-progress-buffer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-linear-progress-buffer}}
      template block text
    {{/mdc-linear-progress-buffer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
