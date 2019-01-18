<template>
    <div>
        <input type="text" placeholder="Write something" v-model="text">
        <input type="button" value="Save" @click="save">
    </div>
</template>
<script>
    import {sendMessage} from "../../util/ws"

    export default{
        props: ['messages', 'messageAttr'],
        data(){
            return {
                id: '',
                text: ''
            }
        },
        methods: {
            save(){
                sendMessage({id: this.id, text: this.text})
                this.id = ''
                this.text = ''
            }
            /*const message = {text: this.text}
             if (this.id) {
             this.$resource('/message{/id}').update({id: this.id}, message)
             .then(result =>
             result.json()
             .then(data => {
             const index = getIndex(this.messages, data.id);
             this.messages.splice(index, 1, data)
             this.id = ''
             this.text = ''
             }))
             } else {
             this.$resource('/message{/id}').save({}, message)
             .then(result =>
             result.json()
             .then(data =>
             this.messages.push(data)))
             this.text = ''
             }
             }*/
        },
        watch: {
            messageAttr (newVal, oldVal){
                this.id = newVal.id
                this.text = newVal.text
            }
        }
    }
</script>
<style>

</style>