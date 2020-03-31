<template>
    <div>
        <h1>Metrics</h1>
        <Metric v-for="metric in metricsConfig" :key="metric.label" :metric="metric"/>
    </div>
</template>

<script>
import config from '../config.js'
import Metric from './Metric'
import { authenticatedReq } from '../helpers'

var metricsConfig = [
    {
        label: "Total Users",
        type: "number",
        dataQuery(callback) {

            authenticatedReq('/admin/total_users', 'GET', {}, result => {
                callback(result.total_users)
            })

        }
    },
    {
        type: 'line',
        label: 'User growth',
        options: {
            color: ['blue'],
            legend: {
                display: true 
            }
        },
        dataQuery(callback) {
            authenticatedReq('/admin/get_analytics/20', 'GET', {}, result => {
                let datasets = [
                    {
                        label: "# of users",
                        data: [],
                        borderColor: 'rgb(251,42,87)',
                        backgroundColor: 'rgba(251,42,87, 0.3)'
                    },
                    {
                        label: "# of High/Lows",
                        data: [],
                        borderColor: 'rgb(240, 240, 240)',
                        backgroundColor: 'rgba(240, 240, 240, 0.3)'
                    },
                    {
                        label: '# of friendships',
                        data: [],
                        borderColor: 'rgb(250,156,29)',
                        backgroundColor: 'rgba(250,156,29, 0.3)'
                    },
                    {
                        label: '# of OAuth users',
                        data: [],
                        borderColor: 'rgb(200, 200, 255)',
                        backgroundColor: 'rgba(200, 200, 255, 1)'
                    }
                ]

                let labels = []

                result.analytics = result.analytics.reverse()

                for (let i = 0; i < result.analytics.length; i++) {
                    const date = result.analytics[i].date
                    const dateObj = new Date(date)
                    
                    const prettyDate = dateObj.toLocaleString(undefined, { month: 'short' }) + ' ' + dateObj.getDate()

                    labels.push(prettyDate.toLocaleString())

                    const item = result.analytics[i]

                    datasets[0].data.push(item.num_users)
                    datasets[1].data.push(item.num_highlows)
                    datasets[2].data.push(item.num_friendships)
                    datasets[3].data.push(item.num_oauth_users)
                }

                callback({
                    labels,
                    datasets
                })

            })
        }
    },
    {
        type: 'number',
        label: 'Average friends per user',
        dataQuery(callback) {
            authenticatedReq('/admin/get_analytics/20', 'GET', {}, result => {
                const item = result.analytics[result.analytics.length - 1]
                
                callback( Math.round(item.num_friendships / item.num_users) )
            })
        }
    },
    {
        type: 'number',
        label: '% OAuth adoption',
        dataQuery(callback) {
            authenticatedReq('/admin/get_analytics/20', 'GET', {}, result => {
                const item = result.analytics[result.analytics.length - 1]
                
                callback( ((item.num_oauth_users / item.num_users) * 100).toFixed(1) + "%" )
            })
        }
    }
]




export default {
    name: 'Metrics',
    components: { Metric },
    data() {
        return {
            metricsConfig: metricsConfig
        }
    }
}
</script>

<style scoped>

</style>