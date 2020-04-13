<template>
    <Page>
        <ActionBar title="My TodoList">
            <ActionItem text="➕" @tap="onAddTap"></ActionItem>
            <ActionItem :text="filterName" @tap="alreadyDone"></ActionItem>
        </ActionBar>
        
        <StackLayout>
            <TodoList :items="itemsView"/>
        </StackLayout>
    </Page>
</template>

<script>

    import todoData from "../todo-data.json"
    import TodoList from "./TodoList"
    import AddItem from "./AddItem"
    import * as localStorage from "nativescript-localstorage";


    export default {
        components: {TodoList, AddItem},
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
                this.$showModal(AddItem, {props: { id: newId}}).then(newItem => {
                    if(newItem) {
                        this.items.unshift(newItem);
                    }
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
                if(localStorage.getItem("items")) {
                    this.items = JSON.parse(localStorage.getItem("items"))
                    this.itemsView = this.items
                }
            }

        },

        mounted() {
            this.getTodos()
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

