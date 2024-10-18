import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

import storeApp from "./stores/alpine-store-app";
import vBase from "./views/base/vBase";
import vHome from "./views/home/vHome";


import dropdown from "./components/dropdown";

Alpine.plugin(persist);
Alpine.store("app", storeApp(Alpine));
Alpine.data("vBase", vBase);
Alpine.data("vHome", vHome);

Alpine.data("dropdown", dropdown);

window.Alpine ?? (window.Alpine = Alpine).start();
