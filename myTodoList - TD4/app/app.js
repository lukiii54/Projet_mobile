import Vue from "nativescript-vue";
import App from "./components/Home";
import Login from "./components/Login"

new Vue({
    render: function(h) {
        return h('Frame', [h(Login)])
    },
    
}).$start();
