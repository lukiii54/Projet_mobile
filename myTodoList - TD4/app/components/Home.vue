<template>
    <Page>
        <ActionBar title="My TodoList">
            <ActionItem text="➕" @tap="onAddTap"></ActionItem>
            <ActionItem :text="filterName" @tap="alreadyDone"></ActionItem>
            <Actionitem text="Actualiser" @tap="getTodos"></Actionitem>
        </ActionBar>
        
        <StackLayout>
            <TodoList :items="itemsView" :token="token" :uuid="uuid"/>
        </StackLayout>
    </Page>
</template>

<script>

    import todoData from "../todo-data.json"
    import TodoList from "./TodoList"
    import AddItem from "./AddItem"
    import Login from "./Login"
    import * as localStorage from "nativescript-localstorage";
    const axios = require('axios')
    import * as btoa from "btoa"
    import {decode, encode} from "base-64"
    import * as utf8 from "utf8";
    
    

    export default {
        components: {TodoList, AddItem},
        props: ['token', 'uuid', 'getTodos'],
        data() {
            return {
                items:[],
                itemsView: [],
                seeDone: false,
                filterName: "See Already Done"
            }
        },
        
        methods: {

            onAddTap() {
                const newId = new Date().getTime();
                this.$showModal(AddItem, {props: { id: newId, token: this.token, uuid: this.uuid}}).then(newItem => {
                    this.getTodos()
                    
                })
            
            },

            alreadyDone() {
                this.seeDone = !this.seeDone
                if(this.seeDone) {
                    this.itemsView = this.items.filter(function(item) {
                        return item.done
                    })
                    this.filterName = "See All"
                }else{
                    this.itemsView = this.items
                    this.filterName = "See Already Done"
                }
            },

            getTodos() {
                axios({
                    method: "get",
                    url: "https://api.todolist.sherpa.one/users/"+this.uuid+"/todos",
                    headers: { Authorization: `Bearer ${this.token}`},
                }).then(res => {
                    this.items = res.data.todos
                    this.itemsView = res.data.todos
                }).catch(err => {
                    console.log(err.err)
                })

            },

        },

        mounted() {
            if(!global.btoa) {
                global.btoa = encode
                this.getTodos()
            }else{
                this.getTodos()
            }
            
        },

        watch: {
            items: {
                handler: function(updatedList) {
                    localStorage.setItem("items", JSON.stringify(updatedList));
                },
                deep:true
            }
        }

    };
</script>

<style scoped>

    actionBar {
        background-color: azure;
    }

    actionItem {
        background-color: blue;
        color: brown;
    }
</style>

