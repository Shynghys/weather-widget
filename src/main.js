import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

const WeatherWidgetElement = defineCustomElement(App);

customElements.define("weather-widget", WeatherWidgetElement);

// import TheWidget from "./components/TheWidget.ce.vue";
// const TheWidgetElement = defineCustomElement(TheWidget);
// customElements.define("the-widget", TheWidgetElement);

// import TheInput from "./components/TheInput.ce.vue";
// const TheInputElement = defineCustomElement(TheInput);
// customElements.define("the-input", TheInputElement);

// import TheSettings from "./components/TheSettings.ce.vue";
// const TheSettingsElement = defineCustomElement(TheSettings);
// customElements.define("the-settings", TheSettingsElement);
