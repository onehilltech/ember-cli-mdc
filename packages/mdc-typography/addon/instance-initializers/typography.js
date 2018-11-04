import { getWithDefault  } from '@ember/object';
import { isNone, isPresent } from '@ember/utils';

export function initialize (app) {
  // Make sure the window and document element exists. If neither exists, then
  // we are running in FastBoot.
  if (isNone (window) || isNone (window.document))
    return;

  // Load the typography configuration, and use it to initialize the
  // typography for the application.

  const ENV = app.application.resolveRegistration ('config:environment');
  const config = getWithDefault (ENV, 'ember-cli-mdc.typography', {});

  const { disabled = false} = config;

  if (!disabled) {
    const rootElement = document.querySelector (app.rootElement);

    if (isPresent (rootElement)) {
      rootElement.classList.add ('mdc-typography');
    }
  }
}

export default {
  initialize
};
