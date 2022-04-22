import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import "./main.scss";

createApp(App)
    .use(createPinia())
    .mount("#app");

