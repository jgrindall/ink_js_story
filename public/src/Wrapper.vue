<template>

    <div ref="wrapperRef" class="wrapper">
        <div class="container"
             :ref="el => addChild(el)"
             v-for="item in items"
             :key="item.id"
             :class="{'seen': visHash[item.id]?.visible}"
             :style="{'animation-delay' : visHash[item.id]?.delay + 's'}"
        >
            <slot :item="item as any"/>
        </div>

    </div>

</template>

<script lang="ts" setup>

    import { ref, Ref, onMounted, onUnmounted, watchEffect, defineEmits, onBeforeUnmount } from 'vue'
    import {isContained} from "./Layout";
    import {debounce} from "underscore";

    type IdType = string;

    interface HasId{
        id: IdType
    }

    type VisData = {
        visible: boolean;
        delay: number;
    };

    const props = defineProps<{
        items: HasId[]
    }>();

    const visHash: Ref<Record<IdType, VisData>> = ref({});

    let children:any[] = [];

    const addChild = (el:any) =>{
        children.push(el)
    }

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

    const updateVis = ()=>{
        const _vis = children.map(isElemVisible);
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
    };

    let handleScroll = () => {
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
        opacity: 0;
        &.seen{
            background: green;
            animation: fading ease-in 1s;
            animation-fill-mode: forwards;
            animation-duration: 1s;
        }
    }
</style>

