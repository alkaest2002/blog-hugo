export default () => ({

  itemsWithAnswers: null,

  initAnswers() {
    this.itemsWithAnswers = this.$store.questionnaire.itemsWithAnswers;
  },

  tableRows: {
    ["x-for"]: "{ itemId, itemA, itemB, answer } in itemsWithAnswers",
    [":key"]: "itemId"
  },

  option(itemTextWithAnswer, optionValue, answer) {
    return {
      "x-text"() {
        return itemTextWithAnswer
      },
      ":class"() {
        return answer.answerValue === optionValue
          ? "font-semibold"
          : "text-sm italic text-gray-400"
      }
    }
  }

});
