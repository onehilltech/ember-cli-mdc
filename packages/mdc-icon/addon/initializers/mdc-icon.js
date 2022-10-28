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
  const icon = mdc.icon || mdc.icons || {};
  const { preconnect = true, dynamicLoad = true, styles = [] } = icon;

  if (preconnect) {
    createLink ({ href: 'https://fonts.googleapis.com', rel: 'preconnect' });
  }

  if (dynamicLoad) {
    const styleLinks = styles.map (style => STYLE_MAP[style]);
    styleLinks.unshift ('Material+Icons');
    const href = `https://fonts.googleapis.com/icon?family=${styleLinks.join ('|')}`;

    createLink ({ href, rel: 'stylesheet' });
  }
}

/**
 * Helper function for adding link tags to the html file.
 *
 * @param options
 */
function createLink (options) {
  const link = document.createElement ('link');
  link.href = options.href;

  if (options.rel) {
    link.rel = options.rel;
  }

  document.head.appendChild (link);
}

export default {
  initialize
};
