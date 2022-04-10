<template>

    <div id="canvas">
        <CanvasView></CanvasView>
    </div>

    <div id="wrapper" ref="wrapperRef">
        <div id="container" ref="containerRef">
            <ComponentView :msg="name" ref="componentRef"></ComponentView>
        </div>
    </div>

    <p style="position: fixed;z-index:3; top:10px; left:10px;">#{{paragraphs.length}}</p>

</template>

<script lang="ts" setup>

    import ComponentView from "./ComponentView.vue";
    import CanvasView from "./CanvasView.vue";
    import { ref, onMounted, onUnmounted, watchEffect, onBeforeUnmount } from 'vue'
    import {useStore as useStoryStore} from './Story';
    import { storeToRefs } from 'pinia'
    import {Paragraph} from "@/types";

    const name = ref("John1234")
    const wrapperRef = ref<HTMLInputElement | null>(null);
    const componentRef = ref<{ getRects: () => HTMLElement[] }>({getRects: ()=>([])});
    const store = useStoryStore();
    const { paragraphs, choices } = storeToRefs(store);

    onMounted(()=>{
        store.load();
        wrapperRef?.value?.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        wrapperRef?.value?.removeEventListener("scroll", handleScroll);
    });

    const isElemVisible = (el: HTMLElement): boolean => {
        const rect = el.getBoundingClientRect();
        const wrapperRect = wrapperRef?.value?.getBoundingClientRect();
        return !!(wrapperRect && rect && rect.top >= wrapperRect.top && rect.bottom <= wrapperRect.bottom);
    };

    function handleFade(paragraphs: any[]){
        const els:HTMLElement[] = componentRef?.value?.getRects();
        let delay = 1;
        els.forEach((el, i)=>{
            const p = paragraphs[i];
            if(isElemVisible(el) && !p.shown){
                store.show(i, delay);
                delay++;
            }
        });
    }

    watchEffect(() => {
        handleFade(paragraphs.value);
    });

    const handleScroll = (e:any) => {
        handleFade(paragraphs.value);
    };

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
        width:768px;
        margin:auto;
        display: block;
    }
</style>
