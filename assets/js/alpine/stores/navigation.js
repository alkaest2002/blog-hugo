import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["urlBase", null],
  ["urlResults", null],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  setUrl(data) {
    Object.entries(data).forEach(([ urlKey, url ]) => this[urlKey] = url);
  },

  goToPage(page) {
    const lowerCasePage = page.toLowerCase();
    const urlKey = `url${lowerCasePage.charAt(0).toUpperCase()}${lowerCasePage.slice(1)}`;
    (urlKey in this) && window.htmx.ajax("GET", this[urlKey]);
  },
  
  goToUrlRaw(urlRaw) {
    window.htmx.ajax("GET", urlRaw);
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
