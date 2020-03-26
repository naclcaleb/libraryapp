<template>
    <div class="vertical">
        <div class="horizontal">
            <a-avatar :size="64" :src="'https://storage.googleapis.com/highlowfiles/' + profileimage"/>
            <div class="vertical">
                <h3>{{ firstname }} {{ lastname }}</h3>
                <a :href="'mailto:' + email">{{ email }}</a>
                <p>{{ bio }}</p>
            </div>

            <div class="vertical">
                <span class="flagged">Flagged: {{ times_flagged }}</span>
                <span class="banned">Banned: {{ banned }}</span>
                <span class="streak">Streak: {{ streak }}</span>
            </div>

            <a-popconfirm :title="banned ? 'Confirm banning user?':'Confirm unbanning user?'" @confirm="confirmBan"><a-button :loading="isBanning" type="primary">{{ banned ? "Unban":"Ban" }} User</a-button></a-popconfirm>
        </div>
    </div>
</template>

<script>
import config from '../config'
import { authenticatedReq } from '../helpers'

export default {
    name: 'User',
    props: ['uid'],
    data() {
        return {
            profileimage: "",
            firstname: "",
            lastname: "",
            email: "",
            streak: "",
            bio: "",
            times_flagged: 0,
            banned: false,
            isBanning: false
        }
    },
    created: function() {

        if (this.banned) {



        } else {
            authenticatedReq('/admin/inspect_user', 'GET', {}, result => {
                console.log(result)
                this.profileimage = result.profileimage
                this.firstname = result.firstname
                this.lastname = result.lastname
                this.email = result.email
                this.streak = result.streak
                this.bio = result.bio
                this.times_flagged = result.times_flagged
                this.banned = result.banned === 0 ? false:true
            })
        }

    },

    methods: {
        confirmBan: function() {
            
            this.isBanning = true
            
            authenticatedReq('/admin/' + (this.banned ? "unban/":"ban/") + this.uid, 'GET', {}, result => {
                if (result.status === "success") {
                    this.banned = !this.banned
                
                    this.$notification.open({
                        message: "User has been " + (this.banned ? "banned":"unbanned")
                    })
                }

                
            }).finally(() => {
                this.isBanning = false
            })

        }
    }
}
</script>

<style scoped>
.vertical {
    display: flex;
    flex-direction: column;
}

.horizontal {
    display: flex;
    flex-direction: row;
    align-items: start;
}

.horizontal div {
    margin-left: 10px;
    padding-top: 10px;
    width: 150px;
}

h3 {
    margin-bottom: 0px;
}

.vertical span {
    font-size: 15px;
    font-weight: bold;
}

.flagged {
    color: orange;
}

.banned {
    color: red;
}

.streak {
    color: blue;
}
</style>