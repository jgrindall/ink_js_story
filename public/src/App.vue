<template>

    <div id="canvas">
        <CanvasView></CanvasView>
    </div>


    <div id="wrapper">
        <div id="container">
            <ComponentView :msg="name"></ComponentView>
        </div>
    </div>


</template>

<script lang="ts" setup>

    import ComponentView from "./ComponentView.vue";
    import CanvasView from "./CanvasView.vue";
    import { ref } from 'vue'

    const name = ref("John1234")

</script>

<style>
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>

<style lang="scss" scoped>
    #app{
        width: 100%;
        height: 100%;
    }
    #wrapper, #canvas{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
    }
    #wrapper{
        z-index: 1;
        overflow-y: auto;
    }
    #container{
        width:600px;
        margin:auto;
        display: block;
    }
</style>

