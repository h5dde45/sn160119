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
            <v-container v-if="profile">
                <messages-list></messages-list>
            </v-container>
        </v-content>

    </v-app>
</template>
<script>
    import {mapState, mapMutations} from'vuex'
    import MessagesList from '../components/messages/MessageList.vue'
    import {addHandler} from '../util/ws'
    export default{
        methods:mapMutations['addMessageMutation',
            'updateMessageMutation', 'removeMessageMutation'],
        created(){
            addHandler(data => {
                if (data.objectType == 'MESSAGE') {
                    const index = this.messages.findIndex(item => item.id === data.body.id);
                    switch (data.eventType) {
                        case 'CREATE':
                            this.addMessageMutation(data.body)
                            break
                        case 'UPDATE':
                            this.updateMessageMutation(data.body)
                            break
                        case 'REMOVE':
                            this.removeMessageMutation(data.body)
                            break
                        default:
                            console.error("Looks like the event type if unknown '${data.eventType}'")
                    }
                } else {
                    console.error("Looks like the object type if unknown '${data.objectType}'")
                }
            })
        },
        components: {
            MessagesList
        },
        computed: mapState(['profile'])
    }
</script>
<style>
</style>