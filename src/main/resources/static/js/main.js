let messageApi = Vue.resource('/message{/id}');

function getIndex(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i
        }
    }
    return -1
}

Vue.component('message-form', {
        props: ['messages', 'messageAttr'],
        data(){
            return {
                id: '',
                text: ''
            }
        },
        template: `<div>
            <input type="text" placeholder="Write something" v-model="text">
            <input type="button" value="Save" @click="save">
            </div>`,
        methods: {
            save(){
                let message = {text: this.text}
                if (this.id) {
                    messageApi.update({id: this.id}, message)
                        .then(result =>
                            result.json()
                                .then(data => {
                                    let index = getIndex(this.messages, data.id);
                                    this.messages.splice(index, 1, data)
                                    this.id = ''
                                    this.text = ''
                                }))
                } else {
                    messageApi.save({}, message)
                        .then(result =>
                            result.json()
                                .then(data =>
                                    this.messages.push(data)))
                    this.text = ''
                }
            }
        },
        watch: {
            messageAttr (newVal, oldVal){
                this.id = newVal.id
                this.text = newVal.text
            }
        }
    }
)

Vue.component('message-row', {
        props: ['message', 'messages', 'editMessage'],
        template: `<div>
        <i>({{message.id}}) </i> {{message.text}}
        <span style="position: absolute; right: 0">
        <input type="button" value="Edit" @click="edit">
        <input type="button" value="Delete" @click="del">
        </span> 
        </div>`,
        methods: {
            edit(){
                this.editMessage(this.message)
            },
            del(){
                messageApi.remove({id: this.message.id})
                    .then(result => {
                        if (result.ok) {
                            this.messages.splice(this.messages.indexOf(this.message), 1)
                        }
                    })
            }
        }

    }
)

Vue.component('messages-list', {
    props: ['messages'],
    data(){
        return {
            message: null
        }
    },
    template: `<div style="position: relative; width: 300px;">
    <message-form :messages="messages" :messageAttr="message"></message-form>
    <message-row v-for="message in messages"
    :key="message.id"
    :message="message" :messages="messages" :editMessage="editMessage"></message-row></div>`,
    methods: {
        editMessage(message){
            this.message = message
        }
    }
})

var app = new Vue({
    el: '#app',
    template: `<div>
    <div v-if="!profile">Авторизация через <a href="/login">Google</a></div>
    <div  v-else>
    <div>{{profile.name}}&nbsp;<a href="/logout">Выйти</a></div>
    <messages-list :messages="messages"/></div>
    </div>`,
    data: {
        messages: frontendData.messages,
        profile: frontendData.profile
    },
    created(){
        // messageApi.get()
        //     .then(result =>
        //         result.json()
        //             .then(data =>
        //                 data.forEach(message => this.messages.push(message))
        //             )
        //     )
    }
})