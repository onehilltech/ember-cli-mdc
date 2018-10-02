import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-step-content', 'Integration | Component | mdc step content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-step-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-step-content}}
      template block text
    {{/mdc-step-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
