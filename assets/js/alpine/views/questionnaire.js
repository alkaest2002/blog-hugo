export default () => ({

  highilightClass: "bg-blue-50",
  currentSelectedOption: null,
  
  async initQuestionnaire() {
    const itemsUrl = this.$refs.questionnaire.dataset.itemsUrl;
    const items = await fetch(itemsUrl).then(res => res.json());
    this.$store.questionnaire.setItems(items);
    this.currentSelectedOption = this.$store.questionnaire.currentAnswerValue;
  },

  get canNavigateAway() {
    return this.$store.questionnaire.currentAnswerValue;
  },

  toggleOption() {
    if (this.currentSelectedOption === "a") return this.$refs.optionB.click();
    if (this.currentSelectedOption === "b") return this.$refs.optionA.click();
    this.$refs.optionA.click();
  },

  keyboardActions() {
    return {
      "arrowdown": () => this.toggleOption(),
      "arrowup": () => this.toggleOption(),
      "enter": () => this.$refs.nextButton.click()
    }
  },

  "item": {
    ["x-ref"]: "item",

    ["@keyup.window.prevent"]({ key }) {
      const functioToCall = this.keyboardActions()[key.toLowerCase()];
      functioToCall && functioToCall();
    }
  },

  "optionA": {
    ["x-ref"]: "optionA",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.a;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "a"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]() {
      this.$store.questionnaire.setAnswer("a");
      this.currentSelectedOption = "a"
    }
  },

  "optionB": {
    ["x-ref"]: "optionB",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.b;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "b"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]() {
      this.$store.questionnaire.setAnswer("b");
      this.currentSelectedOption = "b"
    }
  },

  "counter": {
    ["x-ref"]: "counter",

    ["x-text"]() {
      return `${this.$store.questionnaire.currentItemIndex +1} | ${this.$store.questionnaire.items.length}`;
    },
  },

  "nextButton": {
    ["x-ref"]: "nextButton",

    ["@click.prevent"]() {
      console.log(this.$store.questionnaire.currentAnswerValue)
      this.canNavigateAway && this.$store.questionnaire.goToNextItem();
    }
  },

  "prevButton": {
    ["x-ref"]: "prevButton",

    ["@click.prevent"]() {
      this.canNavigateAway && this.$store.questionnaire.goToPreviousItem();
    }
  }
});
