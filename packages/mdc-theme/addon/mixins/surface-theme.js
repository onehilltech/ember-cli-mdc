import Mixin from '@ember/object/mixin';

export default Mixin.create ({
  customPropertyBindings: [
    'themeSurfaceColor:--mdc-theme-surface'
  ],

  classNameBindings: [
    'themeSurface:mdc-theme--surface',
  ]
});
