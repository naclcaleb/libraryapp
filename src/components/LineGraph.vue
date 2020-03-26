<template>
    <div>
        <LineChart v-if="!loading" :chart-data='datasets' :labels='labels' :options='options'/>
        <a-spin v-if="loading" />
    </div>
</template>

<script>
import LineChart from './LineChart'

export default {
    name: 'LineGraph',
    props: ['dataQuery', 'options'],
    components: { LineChart },
    data: function() {
        return {
            datasets: [],
            labels: [],
            loading: true
        }
    },
    mounted() {
        
    },
    created: function() {
        this.dataQuery((data) => {
            this.labels = data.labels
            this.datasets = data.datasets
            this.loading = false
        })
    }
}
</script>