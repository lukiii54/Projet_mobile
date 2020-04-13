import Vue from "nativescript-vue";
import App from "./components/Home";

new Vue({
    render: function(h) {
        return h('Frame', [h(App)])
    },
    
}).$start();
