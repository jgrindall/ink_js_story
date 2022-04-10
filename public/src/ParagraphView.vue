<template>

    <div>
        <p>{{para.text}}</p>
        <p>{{para.tags}}</p>
    </div>

</template>

<script lang="ts">

    import { defineComponent, PropType } from 'vue';
    import {Paragraph} from "@/types";

    export default defineComponent({
        name: 'ParagraphView',
        props: {
            para: {
                type: Object as PropType<Paragraph>,
                required: true
            }
        },
        setup(props:any) {
            console.log(props);
            return {
                para: props.para
            };
        }
    });

</script>

<style lang="scss" scoped>
    p{
        background: grey;
        margin:40px;
        padding:40px;
    }
</style>