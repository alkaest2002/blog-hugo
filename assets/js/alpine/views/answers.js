export default () => ({
  initAnswers() {},

  itemCouples: {
    ["x-for"]: "(couple, index) in $store.questionnaire.itemCouples",
    [":key"]: "index"
  },

  option(opt, answerValue, index) {
    return {
      "x-text"() {
        return opt
      },
      ":class"() {
        return this.$store.questionnaire.answers[index]?.answerValue === answerValue
          ? "font-semibold"
          : "text-sm italic text-gray-400"
      }
    }
  }

});
