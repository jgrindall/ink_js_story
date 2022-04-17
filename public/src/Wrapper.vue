<template>

    <div ref="wrapperRef" class="wrapper">

        <div class="container"
             :ref="el => addChild(item, el as HTMLElement)"
             v-for="item in items"
             :key="item.id"
             :class="{'seen': visibility[item.id]?.visible}"
             :style="{'animation-delay' : visibility[item.id]?.delay + 's'}"
        >
            <slot :item="item as any"/>
        </div>


    </div>

</template>

<script lang="ts" setup>

    import { ref, Ref, onMounted, onUnmounted, onBeforeUnmount, watchEffect, watch } from 'vue'
    import {isContained} from "./Layout";
    import {debounce} from "underscore";

    interface HasId{
        id: string
    }

    const props = defineProps<{
        items: HasId[]
    }>();

    const visibility : Ref<{[key:string]: {visible: boolean, delay: number}}> = ref({});

    let children: {[key: string] : HTMLElement} = {};

    const addChild = (item:HasId, el:HTMLElement) =>{
        children[item.id] = el;
        updateVis();
    }

    const wrapperRef = ref<HTMLInputElement | null>(null);

    watch(() => props.items, (items: HasId[]) => {
        items.forEach((item:HasId) =>{
            if(!visibility.value[item.id]){
                visibility.value[item.id] = {
                    visible: false,
                    delay:0
                };
            }
        });
        updateVis();
    })

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
        let d = 0;
        const ids = Object.keys(visibility.value);
        ids.forEach(id => {
            const value = visibility.value[id];
            const alreadyShown = value.visible;
            if(!alreadyShown && children[id] && isElemVisible(children[id])){
                visibility.value[id] = {
                    visible: true,
                    delay: d
                };
                d += 0.5;
            }
        })
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

