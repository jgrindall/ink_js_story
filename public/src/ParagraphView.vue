<template>

    <div class="paragraph"
         :class="{'shown': paragraph.shown}"
         :style="{'animation-delay' : paragraph.delay + 's'}"
    >
        <p>
            {{paragraph.text}}
            <span>{{paragraph.delay}}</span>
            <span>{{paragraph.tags}}</span>
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
    @keyframes fading {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .paragraph{
        opacity: 0;
        &.shown{
            background: lightpink;
            animation: fading ease-in 1s;
            animation-fill-mode: forwards;
            animation-duration: 1s;
        }
        p{
            background: grey;
            margin:40px;
            padding:40px;
        }
    }
</style>

