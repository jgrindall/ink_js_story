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
    import {Paragraph} from "./types";
    import {isContained} from "./Layout";
    import {debounce} from "underscore";

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
        return isContained(el.getBoundingClientRect(), wrapperRef?.value?.getBoundingClientRect())
    };

    function handleFade(paragraphs: any[], choices: any[]){
        const els:HTMLElement[] = componentRef?.value?.getRects();
        let delay = 0;
        const entries = [
            ...paragraphs,
            ...choices
        ];
        els.forEach((el, i)=>{
            const p = entries[i];
            console.log(i, el, p);
            if(isElemVisible(el) && !p.shown){
                p.shown = true;
                p.delay = delay;
                //store.show(i, delay);
                delay += 0.3333;
            }
        });
    }

    watchEffect(() => {
        handleFade(paragraphs.value, choices.value);
    });

    let handleScroll = (e:any) => {
        handleFade(paragraphs.value, choices.value);
    };

    handleScroll = debounce(handleScroll, 200);

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
        overflow-y: auto;
    }
    #container{
        width:768px;
        margin:auto;
        display: block;
    }
</style>
