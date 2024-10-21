import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["items", []],
  ["answers", []],
  ["currentItemIndex", 0],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  get nextItemIndex() {
    return Math.min(this.currentItemIndex +1, this.items.length);
  },

  get previousItemIndex() {
    return Math.max(0, this.currentItemIndex -1);
  },

  get currentItem() {
    return this.items[this.currentItemIndex]
  },

  get currentAnswer() {
    return this.answers[this.currentItemIndex]
  },

  get currentAnswerValue() {
    return this.currentAnswer?.answerValue;
  },

  get questionnaireIsComplete() {
    return this.answers.length === this.items.length;
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = 0;
  },

  setAnswer(answerValue) {
    this.answers.splice(this.currentItemIndex, 1, { answerValue })
  },

  goToNextItem() {
    this.currentItemIndex = this.nextItemIndex;
  },

  goToPreviousItem() {
    this.currentItemIndex = this.previousItemIndex;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
