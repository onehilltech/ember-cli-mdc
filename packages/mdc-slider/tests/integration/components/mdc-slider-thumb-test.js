import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-slider-thumb', 'Integration | Component | mdc slider thumb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-slider-thumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-slider-thumb}}
      template block text
    {{/mdc-slider-thumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
