import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// let app;
// export const bootstrap = () => {
//   app = new Vue({
//     render: (h) => h(App),
//   });
// };

// export const mount = () => {
//   app.$mount('#app');
// };

// export const unmount = () => {
//   app.$destroy();
// };
