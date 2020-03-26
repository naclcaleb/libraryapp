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
        console.log(isAuthenticated())
        this.isAuthenticated = isAuthenticated()

        eventBus.$on('authStateChanged', function() {
            this.isAuthenticated = isAuthenticated()
            console.log(isAuthenticated())
        })
    },
    methods: {
        logOut: function(e) {
            logOut()
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