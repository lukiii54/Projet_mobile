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
const axios = require('axios')
export default {
    
    props: ["id", "token", "uuid"],

    data: function() {
        return {
            name: ''
        }
    },
    
    methods: {
        onSaveTap() {
            axios({
                    method: "post",
                    url: "https://api.todolist.sherpa.one/users/"+this.uuid+"/todos",
                    headers: { Authorization: `Bearer ${this.token}`},
                    data: {
                        content: this.name
                    }
                
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
            
                })
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