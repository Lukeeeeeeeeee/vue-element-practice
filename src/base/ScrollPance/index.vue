<template>
    <div class="scroll-container">
        <div class="scroll-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    .scroll-wrapper {
        position: absolute;
    }
}
</style>

