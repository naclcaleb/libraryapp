<template>
    <div>
        <h1>{{ name }}</h1>
        <span><a :href='`mailto:${email}`'>{{ email }}</a></span>
        <div>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app'
require('firebase/firestore')

export default {
    name: 'ContactForm',
    props: ['formID'],
    data() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    created: function() {
        firebase.firestore().collection('contact_forms').doc(this.formID).get().then((snapshot) => {
            const data = snapshot.data()
            this.name = data.firstname + ' ' + data.lastname
            this.email = data.email
            this.message = data.message
        })
    }
}
</script>