<template>
    <div v-if="exists" class="vertical">
        
        <div class="vertical highlowsection">
            <h4>High</h4>
            <div v-if="highImg !== '' && highImg !== null" class="highlowimg" :style="'background-image: url(\'https://storage.googleapis.com/highlowfiles/highs/' + highImg + '\');'"></div>
            <p>{{ high }}</p>
        </div>
        <div class="vertical highlowsection">
            <h4>Low</h4>
            <div v-if="lowImg !== '' && lowImg !== null" class="highlowimg" :style="'background-image: url(\'https://storage.googleapis.com/highlowfiles/lows/' + lowImg + '\');'"></div>
            <p>{{ low }}</p>
        </div>

        <div class="vertical highlowsection">
            <a-popconfirm title="Confirm Delete High/Low?" @confirm="confirmDelete">
                <a-button type="danger" :loading="isDeleting">Delete High/Low</a-button>
            </a-popconfirm>
        </div>
    </div>
</template>

<script>
import config from '../config'
import { authenticatedReq } from '../helpers'

export default {
    name: 'HighLow',
    props: ['highlowid'],
    data() {
        return {
            high: "",
            highImg: "",
            low: "",
            lowImg: "",
            isDeleting: false,
            exists: true
        }
    },
    created: function() {

        authenticatedReq('/admin/inspect_highlow/' + this.highlowid, 'GET', {}, result => {
            this.high = result.high
            this.low = result.low
            this.highImg = result.high_image
            this.lowImg = result.low_image

        })

    },

    methods: {
        confirmDelete: function() {
            
            this.isDeleting = true
            
            authenticatedReq('/admin/delete_highlow/' + this.highlowid, 'GET', {}, result => {
                if (result.status === "success") {
                    this.$notification.open({
                        message: "High/Low has been deleted"
                    })
                    this.exists = false
                }

                
            }).finally(() => {
                this.isDeleting = false
            })

        }
    }
}
</script>

<style scoped>
.vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.vertical.highlowsection {
    align-items: start;
    width: 300px;
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

.highlowimg {
    position: relative;
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>