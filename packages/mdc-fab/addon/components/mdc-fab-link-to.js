import LinkComponent from '@ember/routing/link-component';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

export default LinkComponent.extend ({
  classNames: ['mdc-fab'],

  classNameBindings: ['label:mdc-fab--extended', 'exited:mdc-fab--exited', 'mini:mdc-fab--mini', 'positionClassName'],

  positionClassName: computed ('position', function () {
    const position = this.position || 'bottomRight';
    return `mdc-fab--${dasherize (position)}`;
  }),

  position: null,
})
