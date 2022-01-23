import Vue from 'vue';

import { router } from './_helpers';
import App from './app/App';

import 'core-js/stable'; 
import 'regenerator-runtime/runtime';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});