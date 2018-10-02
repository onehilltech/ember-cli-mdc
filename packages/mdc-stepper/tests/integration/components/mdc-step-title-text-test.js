import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-step-title-text', 'Integration | Component | mdc step title text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-step-title-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-step-title-text}}
      template block text
    {{/mdc-step-title-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
