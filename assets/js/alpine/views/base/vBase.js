export default () => ({
  async initBase(envIsDevelopment) {
    this.$store.app.envIsDevelopment = envIsDevelopment;
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
