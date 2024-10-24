import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["urlBase", null],
  ["urlResults", null],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  getUrlPage(page) {
    const lowerCasePage = page.toLowerCase();
    const urlKey = `url${lowerCasePage.charAt(0).toUpperCase()}${lowerCasePage.slice(1)}`;
    return this[urlKey];
  },

  getUrlRaw(url) {
    return `${this.urlBase}${url}/`;
  },

  setUrl(data) {
    Object.entries(data).forEach(([ urlKey, url ]) => this[urlKey] = url);
  },

  goToUrlPage(page) {
    const url = this.getUrlPage(page);
    (url) && window.htmx.ajax("GET", url);
  },
  
  goToUrlRaw(urlRaw) {
    window.htmx.ajax("GET", urlRaw);
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
