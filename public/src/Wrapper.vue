<template>

    <div ref="wrapperRef" class="wrapper">
        <div class="container"
             :ref="(el:any) => blockRefs[i] = el"
             v-for="(item, i) in items"
             :key="item.id"
             :class="{seen: visHash[item.id]?.visible}"
             :style="{'animation-delay' : visHash[item.id]?.delay + 's'}"
        >
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

    type VisData = {
        visible: boolean;
        delay: number;
    };

    const props = defineProps<propTypes>();

    const visHash: Ref<Record<string, VisData>> = ref({});

    let blockRefs:any[] = [];

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
       let d = 0;
        props.items.forEach( (item: HasId, i:number)=>{
            const alreadyShown = visHash.value[item.id]?.visible;
            if(!alreadyShown && _vis[i]){
                visHash.value[item.id] = {
                    visible: true,
                    delay: d
                };
                d += 0.5;
            }
        });
        console.log(visHash.value);
    };

    let handleScroll = (e:any) => {
       updateVis();
    };

    handleScroll = debounce(handleScroll, 200);

</script>


<style scoped lang="scss">
    @keyframes fading {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .wrapper{
        background: lightpink;
        position: absolute;
        top:100px;
        width:500px;
        height:700px;
        left:400px;
        overflow-y: auto;
    }
    .container{
        opacity: 0.22;
        &.seen{
            background: green;
            animation: fading ease-in 1s;
            animation-fill-mode: forwards;
            animation-duration: 1s;
        }
    }
</style>

