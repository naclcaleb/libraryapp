<template>
    <a-layout id='container'>
        <a-card id='form' title='Sign In'>
            <a-form-item label='Username'>
                <a-input placeholder='Username' v-model='username'/>
            </a-form-item>
            <a-form-item label='Password'>
                <a-input placeholder='Password' v-model='password'/>
            </a-form-item>
            <a-button type='primary' v-on:click='signInSubmit'>Submit</a-button>
        </a-card>
    </a-layout>
</template>

<script>
import { signIn } from '../helpers'

export default {
    name: "SignInPage",
    components: {},
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        signInSubmit: function() {
            signIn(this.username, this.password)
        }
    }
}
</script>

<style>
    #container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    #form {
        background: white;
        width: 25%;
    }
</style>