export default () => ({
  initResults() {},

  "type": {
    ["x-text"]() {
      return this.$store.questionnaire.type;
    },
    [":href"]() {
      const url = `types/${this.$store.questionnaire.type}`;
      return this.$store.url.getUrlRaw(url);
    }
  },
  "compressedAnswers": {
    ["x-text"]() {
      return this.$store.questionnaire.compressedAnswers;
    }
  }
});
