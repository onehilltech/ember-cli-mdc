import Controller from '@ember/controller';

export default Controller.extend({
  on: true,

  isOn: null,

  actions: {
    toggle () {
      this.toggleProperty ('on');
    },

    change (isOn) {
      this.set ('isOn', isOn);
    }
  }
});
