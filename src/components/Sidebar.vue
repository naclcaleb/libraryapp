<template>
    <a-layout>
      <a-layout-sider theme="light" collapsible width="200" style="background: #fff;">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['metrics']"
          :style="{ height: '100%', borderRight: 0 }"
          v-on:select="updatePage"
        >
          <a-menu-item key="metrics"><a-icon type='pie-chart'/><span>Metrics</span></a-menu-item>
          <a-menu-item key="flags"><a-icon type='flag'/><span>Flags</span></a-menu-item>
          <a-menu-item key="bugReports"><a-icon type='bug'/><span>Bug Reports</span></a-menu-item>
          <a-menu-item key="contactForms"><a-icon type='form'/><span>Contact Forms</span></a-menu-item>
          <a-menu-item key='companyHighLow' v-if='permissionLevel == 100'><a-icon type='align-left'/><span>Company High/Low</span></a-menu-item>
        </a-menu>
      </a-layout-sider>
      <Content id="content" :page="page"/>
    </a-layout>
</template>

<script>
import Content from './Content'
import { getPermissionLevel } from '../helpers'

export default {
    name: "Sidebar",
    components: { Content },
    data() {
        return {
            page: 'metrics',
            permissionLevel: 0
        }
    },
    mounted() {
        this.permissionLevel = getPermissionLevel()
    },
    methods: {
        updatePage: function({ item, key, selectedKeys }) {
            if (key !== undefined) {
                this.page = key
            }
        }
    }
}
</script>

<style scoped>

#content {
    height: 100vh;
}
</style>