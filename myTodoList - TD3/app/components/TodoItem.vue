<template>
    <GridLayout columns="200,200">
        <Label col="0" class="item-name" :text="todoItem.name"></Label>
        <Label col="1" :text="statusText" class="item-name"></Label>
    </GridLayout>
</template>

<script>
export default {
    
    props: ["todoItem"],

    data: function() {
        return {
        }
    },
    computed: {
        statusText: function() {
            return this.todoItem.done ? 'Done' : 'Not done';
        }
    }, 

    methods: {
        toggle: function() {
            this.$emit('toggleDone', this.todoItem)
        },
    }

}
</script>

<style lang="scss" scoped>
    .item-name {
        animation-name: zoomIn;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }

    label {
        font-size: 45em;
        text-align: left;
    }
</style>