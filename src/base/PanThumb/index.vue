<template>
    <div class="pan-item" :style="{zIndex: zIndex, height: height, width: width}">
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot></slot>
            </div>
        </div>
        <img :src="image" class="pan-thumb">
    </div>
</template>
<script>
export default {
    name: 'panThumb',
    props: {
        image: {
            type: String,
            required: true
        },
        zIndex: {
            type: Number,
            default: 100
        },
        width: {
            type: String,
            default: '150px'
        },
        height: {
            type: String,
            default: '150px'
        }
    }
}
</script>

<style lang="scss" scoped>
.pan-item {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    cursor: default;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    .pan-info {
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, .05);
        .pan-info-roles-container {
            padding: 20px;
            text-align: center;
        }
    }
    .pan-thumb {
        width: 100%;
        height: 100%;
        background-size: 100%;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        transform-origin: 95% 40%;
        transition: all .3s ease-in-out;
        &:after {
            content: '';
            width: 8px;
            height: 8px;
            position: absolute;
            border-radius: 50%;
            top: 40%;
            left: 95%;
            margin: -4px 0 0 -4px;
            background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
            box-shadow: 0 0 1px rgba(255, 255, 255, .9);
        }
    }
    &:hover .pan-thumb {
        transform: rotate(-90deg);
    }
}


</style>


