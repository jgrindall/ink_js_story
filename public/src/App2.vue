<template>

    <Wrapper :selector="'.block'" :getChildren="getChildren" @change="onChange">
        <div>
            <block v-for="(block:any, i:number) in blocks" :ref="(el:any) => setItemRef(el, i)" :block="block"/>
        </div>
    </Wrapper>

</template>

<script lang="ts" setup>

    import Wrapper from "./Wrapper.vue";
    import Block from "./Block.vue";

    import {
        ref
    } from "vue";

    let blockRefs:any[] = [];

    const setItemRef = (el:any, i:any) => {
        console.log('el', i, el, el.$el);
        if (el) {
            blockRefs[i] = el.$el;
        }
    };

    const onChange = (data: boolean[])=>{
        console.log('data', data);
        data.forEach( (b:boolean, i:number) =>{
            blocks.value[i].visible = b;
        })
    };

    const getChildren = ()=>{
        console.log(blockRefs);
        return Object.values(blockRefs);
    };

    const blocks = ref([
        {content:"Hello1", visible: false},
        {content:"Hello2", visible: false},
        {content:"Hello3", visible: false},
        {content:"Hello4", visible: false},
        {content:"Hello5", visible: false},
        {content:"Hello6", visible: false},
        {content:"Hello7", visible: false},
        {content:"Hello8", visible: false},
        {content:"Hello9", visible: false},
        {content:"Hello10", visible: false}
    ]);

</script>

<style lang="scss">
    #app{
        width: 100%;
        height: 100%;
    }
</style>

