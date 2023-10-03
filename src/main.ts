import { createApp } from "vue";
import "@/assets/css/base.css";
import "@/assets/css/tailwind.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueRewards from "vue-rewards";

// This is the main part

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueRewards);
app.mount("#app");
