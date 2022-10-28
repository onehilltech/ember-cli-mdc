import { isPresent } from '@ember/utils';

const STYLE_MAP = {
  outlined: 'Material+Icons+Outlined',
  twoTone: 'Material+Icons+Two+Tone',
  round: 'Material+Icons+Round',
  sharp: 'Material+Icons+Sharp'
};

export function initialize(app) {
  if (isPresent (document)) {
    // We are going to dynamically load the material icons and not directly include them
    // as content in the index.html file. The reason for this decision is because the icon
    // fonts are really heavy to load. This impacts the loading time of the web application,
    // especially on mobile devices.

    injectIconFont (app);
  }
}

/**
 * Inject the Material icon font into the application.
 *
 * @param app         Target Ember application
 */
function injectIconFont (app) {
  const ENV = app.resolveRegistration ('config:environment');
  const mdc = ENV['ember-cli-mdc'] || {};
  const icons = mdc.icons || {};
  const styles = icons.styles || [];

  const styleLinks = styles.map (style => STYLE_MAP[style]);
  styleLinks.unshift ('Material+Icons');

  const link = document.createElement ('link');
  link.href = `https://fonts.googleapis.com/icon?family=${styleLinks.join ('|')}`;
  link.rel = 'stylesheet';

  document.head.appendChild (link);

}

export default {
  initialize
};
