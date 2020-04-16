<template>
    <div>
        <h1>Company High/Low</h1>
        <a-form layout='vertical'>
            <h3>High</h3>
            <a-form-item label='High Image'>
                <a-upload-dragger
                    name='high'
                    :multiple='false'
                    @change='updateHighImage'>
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>

                    <p class="ant-upload-text">Click or drag file to this area to upload</p>
                </a-upload-dragger>
            </a-form-item>

            <a-form-item label='High Text'>
                <a-textarea v-model='high' :rows='5' placeholder='High'/>
            </a-form-item>

            <h3>Low</h3>

            <a-form-item label='Low Image'>
                <a-upload-dragger
                    name='low'
                    :multiple='false'
                    @change='updateLowImage'>
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>

                    <p class="ant-upload-text">Click or drag file to this area to upload</p>
                </a-upload-dragger>
            </a-form-item>

            <a-form-item label='Low Text'>
                <a-textarea v-model='low' :rows='5' placeholder='Low'/>
            </a-form-item>

            <a-form-item>
                <a-popconfirm
                    title='Ready to submit?'
                    @confirm='submitForm'
                    okText='Yes!'
                    cancelText='No, not yet'
                >
                    <a-button type='primary'>Submit</a-button>
                </a-popconfirm>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import config from '../config.js'
import { authenticatedReq, authenticatedReqMultipart, notEmpty } from '../helpers'

export default {
    name: 'CompanyHighLow',
    components: {  },
    data() {
        return {
            high: null,
            low: null,
            highImage: null,
            lowImage: null
        }
    },
    methods: {
        updateHighImage(info) {
            this.highImage = info.file.originFileObj
        },
        updateLowImage(info) {
            this.lowImage = info.file.originFileObj
        },
        submitForm() {
            let formData = new FormData();

            if (notEmpty(this.highImage)) {
                formData.append('high_image', this.highImage)
            }
            if (notEmpty(this.lowImage)) {
                formData.append('low_image', this.lowImage)
            }

            if (notEmpty(this.high)) {
                formData.append('high', this.high)
            }
            if (notEmpty(this.low)) {
                formData.append('low', this.low)
            }

            authenticatedReqMultipart('/admin/createCompanyHighLow', 'POST', formData, (res) => {
                if ('error' in res) {
                    this.$message.error(`Error: ${error}`)
                } else {
                    this.$message.success('Successfully created High/Low')
                }
            })
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