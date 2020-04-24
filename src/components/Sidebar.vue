<template>
    <a-layout>
      <a-layout-sider theme="light" collapsible width="200" style="background: #fff;">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['mybooks']"
          :style="{ height: '100%', borderRight: 0 }"
          v-on:select="updatePage"
        >
          <a-menu-item key="mybooks"><a-icon type='book'/><span>My Books</span></a-menu-item>
          <a-menu-item key="allbooks"><a-icon type='read'/><span>All Books</span></a-menu-item>
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
            page: 'mybooks',
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