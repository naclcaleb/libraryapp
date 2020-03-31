<template>
    <a-layout-header class="header">
        <img src="../assets/Logo-Triangles.png" class="logo" />
        <a-menu
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
            theme='dark'
            @click='logOut'
            v-if='isAuthenticated'
        >
            <a-menu-item key='1'>
                Log Out
            </a-menu-item>
            <a-menu-item key='2'>
                <a href='https://github.com/highlowapp/highlowbackend' target='_blank'>Backend</a>
            </a-menu-item>
            <a-menu-item key='3'>
                <a href='https://github.com/highlowapp/ios-app' target='_blank'>iOS</a>
            </a-menu-item>
            <a-menu-item key='4'>
                <a href='https://github.com/highlowapp/android-app' target='_blank'>Android</a>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
import { eventBus, logOut, isAuthenticated } from '../helpers'



export default {
    name: "Header",
    data() {
        return {
            isAuthenticated: false
        }
    },
    mounted() {
        this.isAuthenticated = isAuthenticated()

        eventBus.$on('authStateChanged', function() {
            this.isAuthenticated = isAuthenticated()
        })
    },
    methods: {
        logOut: function(e) {
            if (e.key == 1) {
                logOut()
            }
        }
    }
}
</script>


<style scoped>
    .header {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 50px;
        height: 50px;
        float: left;
    }
</style>