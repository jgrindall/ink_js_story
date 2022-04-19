<template>

    <div id="canvas">
        <CanvasView></CanvasView>
    </div>

    <div id="wrapper">
        <ComponentView :msg="name" @continue="onContinue"/>
    </div>

    <p style="position: fixed;z-index:3; top:10px; left:10px;">#{{paragraphs.length}}</p>

</template>

<script lang="ts" setup>

    import ComponentView from "./ComponentView.vue";
    import CanvasView from "./CanvasView.vue";
    import Wrapper from "./Wrapper.vue";
    import { ref, onMounted, onUnmounted, watchEffect, onBeforeUnmount } from 'vue'
    import {useStore as useStoryStore} from './Story';
    import { storeToRefs } from 'pinia'

    const name = ref("John1234")
    const store = useStoryStore();
    const { paragraphs, choices } = storeToRefs(store);

    onMounted(()=>{
        store.load();
    });

    const onContinue = ()=>{
        store.continue();
    };

</script>

<style>
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>

<style lang="scss">
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
    }
</style>
