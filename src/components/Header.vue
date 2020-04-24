<template>
    <a-layout-header class="header">
        <a-icon type='read' id = 'logo'/>
        <h1>Library</h1>
        <a-menu
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
            theme='light'
            @click='logOut'
            v-if='isAuthenticated'
            :selectable='false'
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
        background: #26a69a;
    }

    h1 {
        margin-top: 6px;
        color: white;
    }

    #logo {
        color: white;
        font-size: 30px;
        margin-right: 20px;
    }
</style>