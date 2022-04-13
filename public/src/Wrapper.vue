<template>

    <div ref="wrapperRef" class="wrapper">
        <slot></slot>
    </div>

</template>

<script lang="ts" setup>

    import { ref, onMounted, onUnmounted, watchEffect, defineEmits, onBeforeUnmount } from 'vue'
    import {isContained} from "./Layout";
    import {debounce} from "underscore";

    const props = defineProps({
        selector: String,
        getChildren: Function
    });

    const emit = defineEmits(['change']);


    const wrapperRef = ref<HTMLInputElement | null>(null);

    onMounted(()=>{
        wrapperRef?.value?.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
        wrapperRef?.value?.removeEventListener("scroll", handleScroll);
    });

    const isElemVisible = (el: HTMLElement): boolean => {
        return isContained(el.getBoundingClientRect(), wrapperRef?.value?.getBoundingClientRect())
    };

   function handleFade(){
        const els:HTMLElement[] = [];
        els.forEach((el, i)=>{
            const vis = isElemVisible(el);
            console.log(el, vis);
        });
    }

    let handleScroll = (e:any) => {
        const els = props.getChildren ? props.getChildren() : [];
        console.log("els", els);
        emit('change', els.map(isElemVisible));
    };

    handleScroll = debounce(handleScroll, 200);

</script>


<style scoped lang="scss">
    .wrapper{
        background: lightpink;
        position: absolute;
        top:100px;
        width:500px;
        height:700px;
        left:400px;
        overflow-y: auto;
    }
</style>