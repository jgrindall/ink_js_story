<template>

    <div class="paragraph">
        <p>
            {{paragraph.id}}
            <br/>
            {{paragraph.text}}
            <span>tags = {{paragraph.tags}}</span>
        </p>
    </div>

</template>

<script lang="ts" setup>

    import { PropType } from 'vue';
    import {Paragraph} from "@/types";

    const props = defineProps({
        paragraph:  {
            type: Object as PropType<Paragraph>,
            required: true
        }
    })

</script>

<style lang="scss" scoped>
    .paragraph{
        p{
            background: grey;
            margin:40px;
            padding:40px;
        }
    }
</style>

