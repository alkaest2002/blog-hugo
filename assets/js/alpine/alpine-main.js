import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

import storeApp from "./stores/alpine-store-app";
import viewBase from "./views/base/viewBase";
import viewHome from "./views/home/viewHome";

Alpine.plugin(persist);
Alpine.store("app", storeApp(Alpine));
Alpine.data("viewBase", viewBase);
Alpine.data("viewHome", viewHome);

window.Alpine ?? (window.Alpine = Alpine).start();
