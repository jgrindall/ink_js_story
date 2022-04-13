<template>

    <div ref="wrapperRef" class="wrapper">
        <div class="container" :ref="(el:any) => setItemRef(el, i)" v-for="(item, i) in items" :key="item.id" :class="{seen: visHash[item.id]}">
            <slot :item = "item"/>
        </div>

    </div>

</template>

<script lang="ts" setup>

    import { ref, onMounted, onUnmounted, watchEffect, defineEmits, onBeforeUnmount } from 'vue'
    import type { Ref } from 'vue'
    import {isContained} from "./Layout";
    import {debounce} from "underscore";

    interface HasId{
        id: string
    }

    type propTypes = {
        items: HasId[]
    };

    const props = defineProps<propTypes>();

    const visHash: Ref<Record<string, boolean>> = ref({});

    let blockRefs:any[] = [];

    const setItemRef = (el:any, i:any) => {
        console.log('el', i, el);
        if (el) {
            blockRefs[i] = el;
        }
    };

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

    const updateVis = ()=>{
       const _vis = blockRefs.map(isElemVisible);
        props.items.forEach( (item: HasId, i:number)=>{
            visHash.value[item.id] = visHash.value[item.id] || _vis[i];
        });
        console.log(visHash.value);
    }

    let handleScroll = (e:any) => {
       updateVis();
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
    .seen{
        background:green;
    }
</style>