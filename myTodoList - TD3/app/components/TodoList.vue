<template>
    <ListView for="item in activeItems" @itemTap="onItemTap">
        <v-template>
            <TodoItem :todoItem="item" @toggleDone="onToggleDone"></TodoItem>
        </v-template>
    </ListView>
</template>

<script>

    import TodoItem from "./TodoItem"
    import Detail from './Detail';

    export default {
        components: {TodoItem, Detail},
        props: ['items'],
        methods: {

            onItemTap(args) {
                this.$navigateTo(Detail, {
                    props: {
                        todoItem: args.item
                    }
                })
            },

            onToggleDone(todoItem) {
                const newItem = Object.assign(todoItem, {done : !todoItem.done});
                const idx = this.items.findIndex(i => i.id === todoItem.id)
                this.items = Object.assign([], this.items, {idx: newItem})
            },
        }, 
        computed: {
            activeItems: function() {
                return this.items.filter(function(item) {
                    return !item.deleted;
                })
            }
        }
    };
</script>
