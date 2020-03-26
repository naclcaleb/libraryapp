<template>
    <a-card class="metric" :title="metric.label" style="display: inline-block; padding-bottom: none;">
        <NumberGraph v-if="metric.type === 'number'" :dataQuery="metric.dataQuery"/>
        <LineGraph v-if='metric.type === "line"' :dataQuery='metric.dataQuery' :options='metric.options'/>
    </a-card>
</template>

<script>
import NumberGraph from './NumberGraph'
import LineGraph from './LineGraph'

export default {
    name: 'Metric',
    components: { NumberGraph, LineGraph },
    props: ['metric']
}
</script>

<style scoped>
.metric {
    background: white;
    float: left;
    margin: 1em;
}
</style>