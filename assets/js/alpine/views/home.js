export default () => ({
  
  async initHome() {
    const urlBase = this.$refs.home.dataset.urlBase;
    const urlItems = `${urlBase}items/index.json`;
    const urlResults = `${urlBase}kts/results`;
    const items = await fetch(urlItems).then(res => res.json());
    this.$store.questionnaire.setItems(items);
    this.$store.url.setUrl({ urlBase, urlResults })
  },

});
