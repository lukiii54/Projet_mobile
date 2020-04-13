<template>
    <Page>
        <StackLayout>
            <Button text="Go Back" @tap="onBackTap"></Button>
            <Label :text="todoItem.name"></Label>
            <TextField :text="todoItem.name" v-model="name" hint="Modifier"/>
            <Button :text="statusText" @tap="toggle"></Button>
            <Button v-if="todoItem.done" class="btn btn-danger" @tap="deleteItem">X</Button>
        </StackLayout>
    </Page>
</template>

<script>
import Home from "./Home";
import TodoList from "./TodoList";

export default {
    
    props: ["todoItem"],

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
            this.todoItem.done = !this.todoItem.done
            if(!this.name == "") {
                this.todoItem.name = this.name
            }
            
        },

        onBackTap() {
            if(!this.name == "") {
                this.todoItem.name = this.name
            }
            this.$navigateBack();
        },

        deleteItem: function() {
            confirm('Voulez vous vraiment supprimer cette tache ?').then(result => {
                if(result) {
                    this.todoItem.deleted = !this.todoItem.deleted
                    this.$navigateBack()
                }
            })
        }
    }

}
</script>