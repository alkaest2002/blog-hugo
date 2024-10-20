export default () => ({

  clickedButton: null,
  highilightClass: "bg-blue-50",
  epoch: Date.now(),
  
  async initQuestionnaire() {
    const itemsUrl = this.$refs.questionnaire.dataset.itemsUrl;
    const items = await fetch(itemsUrl).then(res => res.json());
    this.elapsedEpoch = this.$store.questionnaire.currentAnswer?.latency;
    this.$store.questionnaire.setItems(items);
    this.currentSelectedOption = this.$store.questionnaire.currentAnswerValue;
    this.$watch("$store.questionnaire.currentItemIndex", () => this.epoch = Date.now());
  },

  get canNavigateAway() {
    return this.$store.questionnaire.currentAnswerValue;
  },

  toggleOption() {
    const currentAnswerValue = this.$store.questionnaire.currentAnswerValue;
    if (currentAnswerValue === "a") return this.$refs.optionB.click();
    if (currentAnswerValue === "b") return this.$refs.optionA.click();
    this.$refs.optionA.click();
  },

  keyboardActions() {
    return {
      "arrowdown": () => this.toggleOption(),
      "arrowup": () => this.toggleOption(),
      "arrowleft": () => this.$refs.prevButton.click(),
      "arrowright": () => this.$refs.nextButton.click(),
      "enter": () => this.$refs.nextButton.click()
    }
  },

  setAnswer(option) {
    this.$store.questionnaire.setAnswer(option, Date.now()-this.epoch);
  },

  "item": {
    ["x-ref"]: "item",

    ["@keyup.window.prevent"]({ key }) {
      const functioToCall = this.keyboardActions()[key.toLowerCase()];
      functioToCall && functioToCall();
    }
  },

  "itemNumber": {
    ["x-ref"]: "itemNumber",

    ["x-text"]() {
      return this.$store.questionnaire.currentItemIndex +1;
    },
  },

  "itemText": {
    ["x-ref"]: "itemText",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.text;
    },
  },

  "counter": {
    ["x-ref"]: "counter",

    ["x-text"]() {
      return `${this.$store.questionnaire.currentItemIndex +1} 
        | ${this.$store.questionnaire.items.length}`;
    },
  },

  "optionA": {
    ["x-ref"]: "optionA",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.a?.text;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "a"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]() {
      this.setAnswer("a")
    }
  },

  "optionB": {
    ["x-ref"]: "optionB",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.b?.text;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "b"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]() {
      this.setAnswer("b");
    }
  },

  "nextButton": {
    ["x-ref"]: "nextButton",

    ["@click.prevent"]() {
      this.clickedButton = "next";
      this.canNavigateAway && this.$store.questionnaire.goToNextItem();
      setTimeout(() => this.clickedButton = null, 150);
    },

    [":class"]() {
      return this.clickedButton === "next"
        ? this.highilightClass
        : "bg-tranpsarent"
    },
  },

  "prevButton": {
    ["x-ref"]: "prevButton",

    ["@click.prevent"]() {
      this.clickedButton = "prev";
      this.$store.questionnaire.goToPreviousItem();
      setTimeout(() => this.clickedButton = null, 150);
    },

    [":class"]() {
      return this.clickedButton === "prev"
        ? this.highilightClass
        : "bg-tranpsarent"
    }
  }
});
