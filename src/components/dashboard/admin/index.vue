<template>
    <div class="dashboard-admin-container">
        <panel-group></panel-group>
    </div>
</template>

<script>
import PanelGroup from './components/panelGroup';
export default {
    name: 'admin-dashboard',
    components: {
        PanelGroup
    }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    
}
</style>

