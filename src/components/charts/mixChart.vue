<template>
    <div class="chart-container">
        <chart height="100%" width="100%"></chart>
    </div>
</template>

<script>
import Chart from '@/base/Charts/mixChart'

export default {
    components: { Chart }
}
</script>

<style lang="scss" scoped>
.chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 85vh;
}
</style>

