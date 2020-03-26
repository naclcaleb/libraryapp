<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    name: 'LineChart',
    extends: Line,
    mixins: [reactiveProp],
    props: ['options', 'labels'],
    mounted() {
        this.renderLineChart()
    },
    methods: {
        renderLineChart() {
            this.renderChart({
                labels: this.labels,
                datasets: this.chartData
            }, this.options)
        }
    }
}
</script>