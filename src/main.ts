import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import * as antIcons from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/css/index.scss";

const app = createApp(App);

app.use(Antd).use(store).use(router).mount('#app');

const icons: any = antIcons;

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
});
