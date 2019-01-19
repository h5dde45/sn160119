<template>
    <v-card class="my-2">
        <v-card-text primary-title>
            <i>({{message.id}}) </i> {{message.text}}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="edit" small flat round>Edit</v-btn>
            <v-btn @click="del" icon >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default{
        props: ['message', 'messages', 'editMessage', 'deleteMessage'],
        methods: {
            edit(){
                this.editMessage(this.message)
            },
            del(){
                this.deleteMessage(this.message)
            }
        }
    }
</script>
<style>

</style>