import { initState, wipeState } from "../use/useAlpineStore";

const stateFn = () => [
  ["currentView", ""],
  ["burgerIsOpen", false],
  ["languageDropdownIsOpen", false],
  ["envIsDevelopment", false],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  toggleLanguageDropdown() {
    this.languageDropdownIsOpen = !this.languageDropdownIsOpen;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
