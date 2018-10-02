import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-step-actions', 'Integration | Component | mdc step actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-step-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-step-actions}}
      template block text
    {{/mdc-step-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
