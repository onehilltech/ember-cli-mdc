import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-slider-pin-value-marker', 'Integration | Component | mdc slider pin value marker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-slider-pin-value-marker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-slider-pin-value-marker}}
      template block text
    {{/mdc-slider-pin-value-marker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
