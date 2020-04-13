<template>
    <Page>
        <StackLayout>
            <Label text="Se Connecter"></Label>
            <Label text="Votre mail"></Label>
            <TextField v-model="mail" hint="Votre mail"/>
            <Label text="Votre mot de passe"></Label>
            <TextField v-model="password" type="password" hint="Votre mot de passe"/>
            <Button text="Se créer un compte" @tap="createAccount"></Button>
            <Button text="valider" @tap="makeConnection"></Button>
        </StackLayout>
    </Page>
</template>

<script>
import CreateUser from "./CreateUser.vue"
import App from "./Home.vue"
const axios = require('axios')
import * as btoa from "btoa"
import {decode, encode} from "base-64"
import * as utf8 from "utf8";

export default {

    data: function() {
        return {
            mail: "",
            password: "",
            token: "",
            uuid: ""
        }
    },
    computed: {
        
    }, 

    methods: {
        createAccount() {
            this.$navigateTo(CreateUser)
        },
        makeConnection() {
            this.mail = this.mail.replace(" ", "")
            this.password = this.password.replace(" ", "")
            axios({
                method: "post",
                url: "https://api.todolist.sherpa.one/users/signin",
                auth: {
                   username: this.mail,
                   password: this.password
                }
            }).then(res => {
                this.token = res.data.token
                this.uuid = res.data.user.uuid
                this.go()
                
                
            }).catch(err => {
                console.log(err.response.request._response)
            })
        },

        go() {
            this.$navigateTo(App, {
                    props: {
                            token: this.token, 
                            uuid: this.uuid
                        }
                    }).catch(err => console.log(err))
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