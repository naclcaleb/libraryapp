<template>
  <a-layout id="components-layout-demo-top-side-2" style="position: fixed; width: 100%;">
    <Header />
    <a-layout>
      <Sidebar v-if='isAuthenticated'/>
      <SignInPage v-if='!isAuthenticated'/>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SignInPage from './components/SignInPage'
import { eventBus, isAuthenticated } from './helpers'

export default {
  components: { Header, Sidebar, SignInPage },
  data () {
    return {
      collapsed: false,
      isAuthenticated: false
    }
  },
  mounted() {
    this.isAuthenticated = isAuthenticated()
    eventBus.$on('authStateChanged', () => {
      this.isAuthenticated = isAuthenticated()
    })
  }
}
</script>

<style>
#components-layout-demo-top-side-2 {
  height: 100%;
}
</style>