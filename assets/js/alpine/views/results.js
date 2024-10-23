export default () => ({
  initResults() {},

  "type": {
    ["x-text"]() {
      return this.$store.questionnaire.type;
    }
  }
});
