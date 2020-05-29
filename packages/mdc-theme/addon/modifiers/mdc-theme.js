import { modifier } from 'ember-modifier';
import { dasherize } from '@ember/string';

export default modifier (function mdcTheme (element, [prop, value] /*, hash*/) {
  let cssCustomProperty = `--mdc-theme-${dasherize (prop)}`;
  element.style.setProperty (cssCustomProperty, value);
});
