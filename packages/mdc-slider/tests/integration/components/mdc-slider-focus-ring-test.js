import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-slider-focus-ring', 'Integration | Component | mdc slider focus ring', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-slider-focus-ring}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-slider-focus-ring}}
      template block text
    {{/mdc-slider-focus-ring}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
