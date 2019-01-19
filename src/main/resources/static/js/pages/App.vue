<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title>SN</v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="profile">{{profile.name}}</span>
            <v-btn v-if="profile" icon href="/logout">
                <v-icon>
                    directions_run
                </v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container v-if="!profile">Авторизация через <a href="/login">Google</a></v-container>
            <v-container>
                <messages-list v-if="profile" :messages="messages"></messages-list>
            </v-container>
        </v-content>

    </v-app>
</template>
<script>
    import MessagesList from '../components/messages/MessageList.vue'
    import {addHandler} from '../util/ws'
    import {getIndex} from '../util/collections'
    export default{
        data()
        {
            return {
                messages: frontendData.messages,
                profile: frontendData.profile
            }
        },
        created(){
            addHandler(data => {
                let index = getIndex(this.messages, data.id);
                if (index > -1) {
                    this.messages.splice(index, 1, data)
                } else {
                    this.messages.push(data)
                }
            })
        },
        components: {
            MessagesList
        }
    }
</script>
<style>
</style>