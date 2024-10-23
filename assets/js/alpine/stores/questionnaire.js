import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["items", []],
  ["answers", []],
  ["currentItemIndex", 0],
  ["types", {
    EJNT: "ENTJ", EFJN: "ENFJ", EFJS: "ESFJ", EJST: "ESTJ", 
    ENPT: "ENTP", ENFP: "ENFP", EFPS: "ESFP", EPST: "ESTP", 
    IJNT: "INTJ", FIJN: "INFJ", FIJS: "ISFJ", IJST: "ISTJ", 
    INPT: "INTP", FINP: "INFP", FIPS: "ISFP", IPST: "ISTP"
  }],
  ["dimensions", { 
      "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    }
  ]
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

  get typeWithCoherenceValue() {
    const IE = ["I","E"].map(el => [ el, this.dimensions.counts[el] ]);
    const NS = ["N","S"].map(el => [ el, this.dimensions.counts[el] ]);
    const TF = ["T","F"].map(el => [ el, this.dimensions.counts[el] ]);
    const JP = ["J","P"].map(el => [ el, this.dimensions.counts[el] ]);
    return [IE, NS, TF, JP]
      .map(el => el.sort((a, b) => b.at(1) - a.at(1)))
      .map(el => [ el.at(0).at(0), el.at(0).at(1) - el.at(1).at(1)])
  },

  get type() {
    const type = this.typeWithCoherenceValue.map(el => el[0]).sort().join("");
    return this.types[type];
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = this.answers.length === 0
      ? 0
      : Math.min(this.answers.length, this.items.length-1);
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
