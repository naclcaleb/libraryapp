<template>
<div>
    <a-button type="primary" style="margin: 10px;" @click="reload"><a-icon type="reload" />Reload</a-button>
    <a-table :columns="columns" :loading="loading" :dataSource="data" :rowKey="record => record.id">
        <a slot="email" slot-scope="text" @click="showModal(text.id)">{{ text.email }}</a>
        <a slot="name" slot-scope="text" @click="showModal(text.id)">{{ text.name }}</a>
        <a-button type="danger" slot="dismiss" slot-scope="text" @click="dismissForm(text)">Dismiss</a-button>
    </a-table>

    <a-modal v-if="isInspectingForm" title="Inspect Form" :visible="isInspectingForm" @ok="handleOk" @cancel="handleCancel">
        <ContactForm :formID="inspectorFormID" />
    </a-modal>
</div>
</template>


<script>
import config from '../config'
import ContactForm from './ContactForm'
import * as firebase from 'firebase/app'

require('firebase/firestore')

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: "Name",
        dataIndex: '',
        sorter: true,
        scopedSlots: { customRender: 'name' }
    },
    {
        title: "Email",
        dataIndex: '',
        sorter: true,
        scopedSlots: { customRender: 'email' }
    },
    {
        title: 'Dismiss',
        dataIndex: 'id',
        sorter: true,
        scopedSlots: { customRender: 'dismiss' }
    }
]

export default {
    name: 'ContactFormsTable',
    components: { ContactForm },
    data() {
        return {
            columns,
            loading: false,
            data: [],
            isInspectingForm: false,
            inspectorFormID: "",
        }
    },
    mounted() {
        this.loading = true
        console.log("HITHERE")
        firebase.firestore().collection('contact_forms').where('read', '==', false).get().then((querySnapshot) => {
            let data = []
            querySnapshot.forEach((doc) => {
                const dat = doc.data()
                const newDoc = {
                    id: doc.id,
                    name: dat.firstname + ' ' + dat.lastname,
                    email: dat.email
                }
                data.push(newDoc)
            })

            this.data = data
            this.loading = false
        })
    
    },

    methods: {
        showModal(text) {
            this.inspectorFormID = text
            this.isInspectingForm = true
        },
        handleCancel() {
            this.isInspectingForm = false
        },
        handleOk() {
            this.isInspectingForm = false
        },
        reload() {
            this.loading = true
            console.log("HITHERE")
            firebase.firestore().collection('contact_forms').where('read', '==', false).get().then((querySnapshot) => {
                let data = []
                querySnapshot.forEach((doc) => {
                    const dat = doc.data()
                    const newDoc = {
                        id: doc.id,
                        name: dat.firstname + ' ' + dat.lastname,
                        email: dat.email
                    }
                    data.push(newDoc)
                })

                this.data = data
                this.loading = false
            })
        },

        dismissForm(text) {
            firebase.firestore().collection('contact_forms').doc(text).update({read: true}).then(() => {
                this.reload()
            })
        }
    }
}
</script>

<style scoped>

</style>