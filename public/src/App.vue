<template>

    <div id="container">
        <component :msg="'123'"></component>
    </div>

    <div id="canvas">
        <canvas-view></canvas-view>
    </div>

</template>

<script lang="ts">

    import Component from "./Component.vue";
    import CanvasView from "./CanvasView.vue";

    export default {
        data() {
            return {
                name: 'John123'
            }
        },
        components: {
            Component,
            CanvasView
        }
    }

</script>

<style lang="scss" scoped>
    #app{
        width: 100%;
        height: 100%;
    }
    #container{
        width:600px;
        margin:auto;
        display: block;
    }
    #canvas{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
    }
</style>

