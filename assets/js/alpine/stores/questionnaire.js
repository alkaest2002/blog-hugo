import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["items", []],
  ["answers", []],
  ["currentItemIndex", 0],
  ["dimensions", { 
      "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    }
  ],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  get nextItemIndex() {
    return Math.min(this.currentItemIndex +1, this.items.length -1);
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

  getSortedDimensionByCount() {
    const types = {
      EJNT: "ENTJ", EFJN: "ENFJ", EFJS: "ESFJ", EJST: "ESTJ", 
      ENPT: "ENTP", ENFP: "ENFP", EFPS: "ESFP", EPST: "ESTP", 
      IJNT: "INTJ", IFJN: "INFJ", IFJS: "ISFJ", IJST: "ISTJ", 
      INPT: "INTP", IFNP: "INFP", IFPS: "ISFP", IPST: "ISTP"
    }
    const dimensionsByCount = Object.entries(this.dimensions.counts)
      .sort((a, b) => b.at(-1)-a.at(-1))
      .map(([key, _]) => key);
    const type = Object.keys(types)
      .map(k => ([k, k.split("").reduce((acc, itr) => acc += dimensionsByCount.indexOf(itr), 0)]))
      .sort((a, b) => a.at(-1) - b.at(-1))
      .map(([k, _]) => k)
      .at(0);
    return types[type];
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = 0;
  },

  setAnswer(answerValue, answerlatency) {
    const previousLatency = this.currentAnswer?.latency || 0;
    const latency = previousLatency + answerlatency;
    const dimension = this.currentItem.options[answerValue].dimension;
    this.answers.splice(this.currentItemIndex, 1, { answerValue, dimension, latency });
    this.dimensions = stateFn().at(-1).at(-1);
    Object.values(this.answers).forEach(el => {
      this.dimensions.counts[el.dimension] += 1;
      this.dimensions.latencies[el.dimension] += el.latency;
    })
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
