<template>
    <Page>
        <StackLayout>
            <Button text="Go Back" @tap="onBackTap"></Button>
            <Label :text="todoItem.content"></Label>
            <TextField :text="todoItem.name" v-model="name" hint="Modifier"/>
            <Button :text="statusText" @tap="toggle"></Button>
            <Button v-if="todoItem.done" class="btn btn-danger" @tap="deleteItem">X</Button>
        </StackLayout>
    </Page>
</template>

<script>
const axios = require('axios')
import Home from "./Home";
import TodoList from "./TodoList";

export default {
    
    props: ["todoItem", "token", "uuid"],

    data: function() {
        return {
            status: 0,
            name: ""
        }
    },
    computed: {
        statusText: function() {
            return this.todoItem.done ? 'Done' : 'Not done';
        }
    }, 

    methods: {
        toggle: function() {
            console.log(this.token)
            this.todoItem.done = !this.todoItem.done
            if(!this.name == "") {
                this.todoItem.name = this.name
            }

        
            
        },

        onBackTap() {
            if(!this.name == "") {
                this.todoItem.name = this.name
            }
            axios({
                    method: "patch",
                    url: "https://api.todolist.sherpa.one/users/"+this.uuid+"/todos/"+this.todoItem.uuid,
                    headers: { Authorization: `Bearer ${this.token}`},
                    data: {
                        content: this.todoItem.name,
                        done: this.todoItem.done
                    }
                }).then(res => {
                    this.$navigateBack();
                }).catch(err => {
                    console.log(err.response.request._response)
                })
            
        },

        deleteItem: function() {
            confirm('Voulez vous vraiment supprimer cette tache ?').then(result => {
                if(result) {
                    this.todoItem.deleted = !this.todoItem.deleted

                    axios({
                    method: "delete",
                    url: "https://api.todolist.sherpa.one/users/"+this.uuid+"/todos/"+this.todoItem.uuid,
                    headers: { Authorization: `Bearer ${this.token}`},
                    }).then(res => {
                        this.$navigateBack();
                    }).catch(err => {
                        console.log(err.response.request._response)
                    })
                    
                }
            })
        }
    }

}
</script>