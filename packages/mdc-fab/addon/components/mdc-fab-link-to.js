import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend ({
  classNames: ['mdc-fab'],

  classNameBindings: ['label:mdc-fab--extended', 'exited:mdc-fab--exited', 'mini:mdc-fab--mini']
})