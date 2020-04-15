<template>
    <div>
        <h1>Company High/Low</h1>

        <h3>High</h3>
        <a-upload-dragger
            name='high'
            :multiple='false'
            @change='updateHighImage'>
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>

            <p class="ant-upload-text">Click or drag file to this area to upload</p>
        </a-upload-dragger>

        <a-input type='textarea' v-model='high'/>

        <h3>Low</h3>
        <a-upload-dragger
            name='low'
            :multiple='false'
            @change='updateLowImage'>
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>

            <p class="ant-upload-text">Click or drag file to this area to upload</p>
        </a-upload-dragger>

        <a-input type='textarea' v-model='low'/>

        <a-button @on:click='submit' type='primary'>Submit</a-button>
    </div>
</template>

<script>
import config from '../config.js'
import { authenticatedReq } from '../helpers'

export default {
    name: 'CompanyHighLow',
    components: {  },
    data() {
        return {
            high: undefined,
            low: undefined,
            highImage: undefined,
            lowImage: undefined
        }
    },
    methods: {
        updateHighImage(info) {
            this.highImage = info.file
        },
        updateLowImage(info) {
            this.lowImage = info.file
        },
        submit() {
            let formData = new FormData();
            formData.append('high', this.highImage)
            formData.append('low', this.lowImage)
            
            formData.append('high', this.high)
            formData.append('low', this.low)

            
        }
    }
}
</script>

<style scoped>
    a-upload-dragger {
        margin: 1em;
    }

    div >>> a-button {
        margin: 1em;
    }

    a-input {
        background: red;
    }
</style>