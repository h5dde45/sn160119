<template>
    <v-layout align-space-around justify-start column>
        <message-form :messages="messages" :messageAttr="message"></message-form>
        <message-row v-for="message in sortedMessages"
                     :key="message.id"
                     :message="message"
                     :messages="messages"
                     :editMessage="editMessage"
                     :deleteMessage="deleteMessage"
        ></message-row>
    </v-layout>
</template>
<script>
    import MessageRow from "./MessageRow.vue"
    import MessageForm from "./MessageForm.vue"

    export default{
        props: ['messages'],
        data(){
            return {
                message: null
            }
        },
        computed: {
            sortedMessages(){
                return this.messages.sort((a, b) => b.id - a.id)
            }
        },
        methods: {
            editMessage(message){
                this.message = message
            },
            deleteMessage(message){
                this.$resource('/message{/id}')
                    .remove({id: message.id}).then(result => {
                    if (result.ok) {
                        this.messages.splice(this.messages.indexOf(message), 1)
                    }
                })
            }
        },
        components: {
            MessageRow,
            MessageForm
        }
    }
</script>
<style>

</style>