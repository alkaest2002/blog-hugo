export default () => ({
  initBase() {
    this.$store.app.envIsDevelopment = this.$refs.base.dataset.env == "true";
  },

  htmxEvents: {
    ["@htmx:after-swap.camel"]() {
      this.$store.app.burgerIsOpen = false;
    },
  },

  opacity: {
    [":class"]() {
      return this.$store.app.burgerIsOpen ? css.display["opacity-20"] : null;
    },
  },
});
