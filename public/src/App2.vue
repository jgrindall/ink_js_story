<template>

    <Wrapper :items="blocks">

        <template #default="{ item }">
            <block :block="item"></block>
        </template>

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

    const blocks = ref([
        {content:"Hello1", visible: false, id:"1"},
        {content:"Hello2", visible: false, id:"2"},
        {content:"Hello3", visible: false, id:"3"},
        {content:"Hello4", visible: false, id:"4"},
        {content:"Hello5", visible: false, id:"5"},
        {content:"Hello6", visible: false, id:"6"},
        {content:"Hello7", visible: false, id:"7"},
        {content:"Hello8", visible: false, id:"8"},
        {content:"Hello9", visible: false, id:"9"},
        {content:"Hello10", visible: false, id:"10"}
    ]);

</script>

<style lang="scss">
    #app{
        width: 100%;
        height: 100%;
    }
</style>

