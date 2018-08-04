import Fab from './mdc-fab';
import layout from '../templates/components/mdc-fab-simple';
import { equal } from '@ember/object/computed'

export default Fab.extend({
  layout,

  extended: null,

  extendedLeft: equal ('extended', 'left'),
  extendedRight: equal ('extended', 'right')
});
