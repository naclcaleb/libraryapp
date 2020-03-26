<template>
<div>
    <a-button type="primary" style="margin: 10px;" @click="reload"><a-icon type="reload" />Reload</a-button>
    <a-table :columns="columns" :loading="loading" :dataSource="data" :rowKey="record => record.id">
        <a slot="uid" slot-scope="text" @click="showModal(text)">{{ text }}</a>
        <a slot="title" slot-scope="text" @click="showBugReport(text)">{{ text.title }}</a>
        <a slot="message" slot-scope="text" @click="showBugReport(text)">{{ text.message }}</a>
        <a-button type="danger" slot="dismiss" slot-scope="text" @click="dismissBugReport(text)">Dismiss</a-button>
    </a-table>

    <a-modal v-if="isInspectingUser" title="Inspect User" :visible="isInspectingUser" @ok="handleOk" @cancel="handleCancel">
        <User :uid="inspectorUid" />
    </a-modal>
    <a-modal v-if="isInspectingBugReport" title="Inspect Bug Report" :visible="isInspectingBugReport" @ok="handleOk" @cancel="handleCancel">
        <BugReport :bug="inspectorBug" />
    </a-modal>
</div>
</template>


<script>
import config from '../config'
import BugReport from './BugReport'
import User from './User'
import { authenticatedReq } from '../helpers'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: 'Title',
        dataIndex: '',
        sorter: true,
        scopedSlots: { customRender: 'title' }
    },
    {
        title: "Message",
        dataIndex: '',
        sorter: true,
        scopedSlots: { customRender: 'message' }
    },
    {
        title: "UID",
        dataIndex: 'uid',
        sorter: true,
        scopedSlots: { customRender: 'uid' }
    },
    {
        title: 'Timestamp',
        dataIndex: '_timestamp',
        sorter: true
    },
    {
        title: 'Dismiss',
        dataIndex: 'id',
        scopedSlots: { customRender: 'dismiss' }
    }
]

export default {
    name: 'BugReportsTable',
    components: { BugReport, User },
    data() {
        return {
            columns,
            loading: false,
            data: [],
            isInspectingUser: false,
            inspectorUid: "",
            isInspectingBugReport: false,
            inspectorBugid: ""
        }
    },
    mounted() {
        this.loading = true

        authenticatedReq('/admin/list_bug_reports', 'GET', {}, data => {
            console.log(data)
            this.data = data.bug_reports
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
            this.isInspectingBugReport = false
        },
        handleOk() {
            this.isInspectingUser = false
            this.isInspectingBugReport = false
        },
        showBugReport(text) {
            this.inspectorBug = text
            this.isInspectingBugReport = true
        },
        reload() {
            this.loading = true
            this.data = []
            authenticatedReq('/admin/list_bug_reports', 'GET', {}, data => {
                console.log(data)
                this.data = data.bug_reports
                this.loading = false
            })
        },

        dismissBugReport(text) {
            authenticatedReq('/admin/dismiss_bug/' + text, 'GET', {}, data => {
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