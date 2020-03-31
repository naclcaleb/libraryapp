<template>
<div>
    <a-button type="primary" style="margin: 10px;" @click="reload"><a-icon type="reload" />Reload</a-button>
    <a-table :columns="columns" :loading="loading" :dataSource="data" :rowKey="record => record.id">
        <a slot="uid" slot-scope="text" @click="showModal(text)">{{ text }}</a>
        <a slot="flagger" slot-scope="text" @click="showModal(text)">{{ text }}</a>
        <a slot="highlowid" slot-scope="text" @click="showHighLowModal(text)">{{ text }}</a>
        <a-button type="danger" slot="dismiss" slot-scope="text" @click="dismissFlag(text)">Dismiss</a-button>
    </a-table>

    <a-modal v-if="isInspectingUser" title="Inspect User" :visible="isInspectingUser" @ok="handleOk" @cancel="handleCancel">
        <User :uid="inspectorUid" />
    </a-modal>
    <a-modal v-if="isInspectingHighLow" title="Inspect High/Low" :visible="isInspectingHighLow" @ok="handleOk" @cancel="handleCancel">
        <HighLow :highlowid="inspectorHighlowid" />
    </a-modal>
</div>
</template>


<script>
import config from '../config'
import User from './User'
import HighLow from './HighLow'
import { authenticatedReq } from '../helpers'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: "Type",
        dataIndex: '_type',
        sorter: true
    },
    {
        title: "Highlow ID",
        dataIndex: 'highlowid',
        sorter: true,
        scopedSlots: { customRender: 'highlowid' }
    },
    {
        title: 'UID',
        dataIndex: 'uid',
        sorter: true,
        scopedSlots: { customRender: 'uid' }
    },
    {
        title: 'Flagger',
        dataIndex: 'flagger',
        sorter: true,
        scopedSlots: { customRender: 'flagger' }
    },
    {
        title: 'Dismiss',
        dataIndex: 'id',
        scopedSlots: { customRender: 'dismiss' }
    }
]

export default {
    name: 'FlagsTable',
    components: { User, HighLow },
    data() {
        return {
            columns,
            loading: false,
            data: [],
            isInspectingUser: false,
            inspectorUid: "",
            isInspectingHighLow: false,
            inspectorHighlowid: ""
        }
    },
    mounted() {
        this.loading = true

        authenticatedReq('/admin/list_flags', 'GET', {}, data => {
            this.data = data.flags
            this.loading = false
        })

    },

    methods: {
        showModal(text) {
            this.inspectorUid = text
            this.isInspectingUser = true
        },
        handleCancel() {
            this.isInspectingUser = false
            this.isInspectingHighLow = false
        },
        handleOk() {
            this.isInspectingUser = false
            this.isInspectingHighLow = false
        },
        showHighLowModal(text) {
            this.inspectorHighlowid = text
            this.isInspectingHighLow = true
        },
        reload() {
            this.loading = true
            this.data = []
            authenticatedReq('/admin/list_flags', 'GET', {}, data => {
                this.data = data.flags
                this.loading = false
            })
        },

        dismissFlag(text) {
            authenticatedReq('/admin/dismiss_flag/' + text, 'GET', {}, data => {
                if (data.status === 'success') {
                    this.reload()
                }
            })
        }
    }
}
</script>

<style scoped>

</style>