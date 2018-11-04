import { getWithDefault  } from '@ember/object';
import { isNone } from '@ember/utils';

export function initialize (app) {
  // Make sure the window and document element exists. If neither exists, then
  // we are running in FastBoot.
  if (isNone (window) || isNone (window.document))
    return;

  const ENV = app.application.resolveRegistration ('config:environment');
  const disabled = getWithDefault (ENV, 'ember-cli-mdc.disabled', false);

  if (!disabled) {
    // Find the root elements for applying typography. The default root
    // element is the root element of the application.

    const rootSelector = getWithDefault (ENV, 'ember-cli-mdc.typography', app.rootElement);
    const elements = document.querySelectorAll (rootSelector);

    for (let i = 0, len = elements.length; i < len; ++ i)
      elements[i].classList.add ('mdc-typography');
  }
}

export default {
  initialize
};
