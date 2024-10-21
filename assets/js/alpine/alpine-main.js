import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

// stores
import sApp from "./stores/app";
import sQuestionnaire from "./stores/questionnaire";

// views
import vBase from "./views/base";
import vHome from "./views/home";
import vQuestionnaire from "./views/questionnaire";

// components
import cDropdown from "./components/dropdown";

Alpine.plugin(persist);
Alpine.store("app", sApp(Alpine));
Alpine.store("questionnaire", sQuestionnaire(Alpine));
Alpine.data("base", vBase);
Alpine.data("home", vHome);
Alpine.data("questionnaire", vQuestionnaire);

Alpine.data("dropdown", cDropdown);

window.Alpine ?? (window.Alpine = Alpine).start();
