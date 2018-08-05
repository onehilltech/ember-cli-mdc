import Component from '@ember/component';
import layout from '../templates/components/mdc-button';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { Ripple } from 'ember-cli-mdc-ripple';
import { Theme } from 'ember-cli-mdc-theme';

export default Component.extend (Ripple, Theme, {
  layout,

  tagName: 'button',

  classNames: ['mdc-button'],

  classNameBindings: ['mdcStyleClassName', 'dense:mdc-button--dense'],

  attributeBindings: ['disabled', 'value', 'type'],

  mdcStyleClassName: computed ('style', function () {
    const style = this.get ('style');
    return isPresent (style) ? `mdc-button--${style}` : null;
  }),

  didInsertElement () {
    return this._super (...arguments);
  }
});
