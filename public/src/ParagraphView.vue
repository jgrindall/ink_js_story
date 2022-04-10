<template>

    <div :class="{'shown': paragraph.shown}">
        <p>{{paragraph.text}}</p>
        <p>{{paragraph.tags}}</p>
    </div>

</template>

<script lang="ts" setup>

    import { PropType, defineProps } from 'vue';
    import {Paragraph} from "@/types";

    const props = defineProps({
        paragraph:  {
            type: Object as PropType<Paragraph>,
            required: true
        }
    })

</script>

<style lang="scss" scoped>
    p{
        background: grey;
        margin:40px;
        padding:40px;
    }
    .shown{
        background: lightpink;
    }
</style>
