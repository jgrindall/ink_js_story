<template>

    <div class="paragraph" :class="additionalClasses" ref="element">
        <p>
            {{paragraph.id}}  {{visible}}
            <br/>
            <div v-for="content in paragraph.contents">
                {{ content.type }}, {{ content.text }}
            </div>
            <br/>
            <br/>
            {{paragraph.tags}}

            <div v-if="paragraph.tags.images" class="images">
                <img v-for="img in paragraph.tags.images" :src='img'/>
            </div>

        </p>
    </div>

</template>

<script lang="ts" setup>

    import { PropType, computed, watch, ref, onMounted, onBeforeUnmount } from 'vue';
    import {Paragraph, Tags} from "./types";

    const props = defineProps({
        paragraph:  {
            type: Object as PropType<Paragraph>,
            required: true
        },
        visible:{
            type: Boolean,
            required: true
        }
    })

    const additionalClasses = computed((): string[]=>{
        return (props.paragraph.tags.classNames || [])
    });

    const emit = defineEmits(['seen']);

    onMounted(()=>{
        setTimeout(()=>{
            emit('seen');
        }, 1000)
    })

    const element = ref<HTMLElement | null>(null);

    defineExpose({ element })

</script>

<style lang="scss" scoped>
    .paragraph{
        opacity: 0;
        background: green;
        animation: fading ease-in 1s;
        animation-fill-mode: forwards;
        animation-duration: 1s;
        p{
            background: grey;
            margin:40px;
            padding:40px;
        }
        .images{
            img{
                width: 100px;
                height: 100px;
                background: gold;
                margin:8px;
            }
        }
        &.red{
            color: #990E16;
        }

        @keyframes fading {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }
</style>





