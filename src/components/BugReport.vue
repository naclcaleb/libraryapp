<template>
    <div class="vertical">
        <h1>{{ bug.title }}</h1>
        <small>{{ bug._timestamp }}</small>
        <p>{{ bug.message }}</p>
    </div>
</template>

<script>
export default {
    name: 'BugReport',
    props: ['bug']
}
</script>

<style scoped>
.vertical {
    display: flex;
    flex-direction: column;
    align-items: start;
}

.horizontal {
    display: flex;
    flex-direction: row;
    align-items: start;
}

small {
    color: gray;
}
</style>