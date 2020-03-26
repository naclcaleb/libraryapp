<template>
    <div>
        <p v-if="!loading">{{ number }}</p>
        <a-spin v-if="loading" />
    </div>
</template>

<script>
export default {
    name: 'NumberGraph',
    props: ['dataQuery'],
    data: function() {
        return {
            number: 0,
            loading: true
        }
    },
    created: function(){
        this.loading = true
        this.dataQuery((num) => {
            this.number = num
            this.loading = false
        })
    }
}
</script>

<style scoped>
div {
    text-align: center;
}

p {
    width: 100%;
    text-align: center;
    font-size: 50px;
    color: #1890ff;
    margin: 0px;
}

</style>