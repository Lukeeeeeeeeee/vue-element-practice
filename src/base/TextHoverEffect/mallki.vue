<template>
    <a href="#" class="link--mallki" :class="className">
        {{ text }}
        <span :data-letters="text"></span>
        <span :data-letters="text"></span>
    </a>
</template>

<script>
export default {
    props: {
        className: {
            type: String
        },
        text: {
            type: String,
            default: 'vue-element-admin'
        }
    }
}
</script>

<style lang="scss">
.link--mallki {
    font-weight: 800;
    color: #4dd9d5;
    font-family: 'Dosis', sans-serif;
    transition: color .5s .25s;
    overflow: hidden;
    position: relative;
    display: inline-block;
    line-height: 1;
    outline: none;
    text-decoration: none;
    &:hover {
        transition: none;
        color: transparent;
    }
    &::before {
        position: absolute;
        left: 0;
        top: 50%;
        content: '';
        width: 100%;
        height: 6px;
        background-color: #3888fa;
        margin: -3px 0 0 0;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        -webkit-transition: -webkit-transform 0.4s;
        transition: transform .4s;
        -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    }
    &:hover::before {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    span {
        position: absolute;
        height: 50%;
        width: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
        &::before {
            position: absolute;
            content: attr(data-letters);
            color: red;
            left: 0;
            width: 100%;
            color: #3888fa;
            transition: transform .5s;
        }
        &:nth-child(2) {
            top: 50%;
        }
        &:first-child::before {
            top: 0;
            transform: translate3d(0, 100%, 0);
        }
        &:nth-child(2)::before {
            bottom: 0;
            transform: translate3d(0, -100%, 0)
        }
    }
    &:hover span::before {
        transition-delay: .3s;
        transform: translate3d(0, 0, 0);
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
}
</style>


