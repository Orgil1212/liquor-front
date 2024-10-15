import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // router-ыг импортлох

const app = createApp(App);
app.use(router); // router-ыг хэрэглэж эхлэх
app.mount('#app');
