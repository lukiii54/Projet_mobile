<template>
    <Page>
        <StackLayout>
            <Label text="Ajouter une nouvelle tache"></Label>
            <TextField v-model="name" hint="Nom de votre tache"></TextField>
            <Button text="save" @tap="onSaveTap"></Button>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    
    props: ["id"],

    data: function() {
        return {
            name: ''
        }
    },
    
    methods: {
        onSaveTap() {
            if(this.name !== "") {
                const newItem = {
                    id: this.id,
                    name: this.name,
                    done: false,
                    deleted: false
                };
                this.$modal.close(newItem);
            }else{
                alert("Pas de nom !")
            }
        }
    }

}
</script>