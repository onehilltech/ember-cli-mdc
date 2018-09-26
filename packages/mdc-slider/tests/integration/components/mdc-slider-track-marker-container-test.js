import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-slider-track-marker-container', 'Integration | Component | mdc slider track marker container', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-slider-track-marker-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-slider-track-marker-container}}
      template block text
    {{/mdc-slider-track-marker-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
