export default () => ({

  highilightClass: "bg-blue-50",
  
  async initQuestionnaire() {
    this.$store.app.currentView = "questionnaire";
    const itemsUrl = this.$refs.questionnaire.dataset.itemsUrl;
    const items = await fetch(itemsUrl).then(res => res.json());
    this.$store.questionnaire.setItems(items);
  },

  get canNavigateAway() {
    return this.$store.questionnaire.currentAnswerValue
  },

  "item": {
    ["x-ref"]: "item"
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
