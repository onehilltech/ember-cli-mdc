import { isNone, isPresent, typeOf } from '@ember/utils';

export function initialize (app) {
  // Make sure the window and document element exists. If neither exists, then
  // we are running in FastBoot.
  if (isNone (window) || isNone (window.document))
    return;

  // Load the typography configuration, and use it to initialize the
  // typography for the application.

  const ENV = app.application.resolveRegistration ('config:environment');
  const mdcConfig = ENV['ember-cli-mdc'] || {};

  const {
    disabled = false,
    preconnect = true,
    dynamicLoad = true,
    weights = [300, 400, 500, 600, 700]
  } = mdcConfig;

  if (!disabled) {
    const rootElement = typeOf (app.rootElement) === 'string' ? document.querySelector (app.rootElement) : app.rootElement;

    if (isPresent (rootElement)) {
      rootElement.classList.add ('mdc-typography');
    }
  }

  if (dynamicLoad) {
    injectTypographyLinks (preconnect, weights);
  }
}


/**
 * Inject the Material icon font into the application.
 *
 * @param app         Target Ember application
 */
function injectTypographyLinks (preconnect, weights) {
  if (preconnect) {
    createLink ({ href: 'https://fonts.googleapis.com', rel: 'preconnect' });
  }

  const href = `https://fonts.googleapis.com/css?family=Roboto:${weights.join(',')}`;
  createLink ({ href });
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
