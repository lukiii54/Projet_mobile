<template>
    <Page>
        <StackLayout>
            <Label text="Créer votre compte"></Label>
            <Label text="Nom : "></Label>
            <TextField v-model="nom" hint="Votre nom"/>
            <Label text="Prenom : "></Label>
            <TextField v-model="prenom" hint="Votre prenom"/>
            <Label text="Email : "></Label>
            <TextField v-model="mail" hint="Votre email"/>
            <Label text="Sexe : Homme / Femme"></Label>
            <Switch @checkedChange="setSexe"/>
            <Button text="valider" @tap="createAccount"></Button>
        </StackLayout>
    </Page>
</template>

<script>
const axios = require('axios')
import * as btoa from "btoa"
import {decode, encode} from "base-64"
import * as utf8 from "utf8";
import App from "./Home.vue"

import Login from "./Login.vue"

export default {

    data: function() {
        return {
            nom: "",
            prenom: "",
            mail: "",
            sexe: "male",
            data: "",
            token: ""
        }
    },
    computed: {
        
    }, 

    methods: {
        createAccount() {
            axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/signup",
                data: {
                    email: this.mail,
                    firstname: this.prenom,
                    lastname: this.nom,
                    gender: this.sexe
                }
            }).then(result => {
                this.data = result.data
                alert({title: "Votre mot de passe",message: this.data.password, okButtonText: "ok"}).then(() => {
                    this.makeConnection()
                })
            }).catch(r => {
                alert(r)
            })
        },

        makeConnection() {
            this.$navigateTo(Login)
            
        },

        setSexe() {
            if(this.sexe === "female") {
                this.sexe = "male"
            }else{
                this.sexe = "female"
            }
        }
    },

    computed: {
        
    },

    mounted() {
        if(!global.btoa) {
            global.btoa = encode
        }
    }
}
</script>

<style scoped>

</style>