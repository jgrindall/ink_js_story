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
                <img v-for="img in paragraph.tags.images" :src="'./images/' + img"/>
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
        const classNames = props.paragraph.tags.classNames || [];
        const a = ["animate", "fading", "banana", "red"];
        return [
            ...classNames, ...a
        ];
    });

    const emit = defineEmits(['seen']);

    const element = ref<HTMLElement | null>(null);

    defineExpose({ element })

    watch(() => props.visible, (visible: boolean) => {
        if(visible){
            setTimeout(()=>{
                emit('seen');
            }, 1000)
        }
    })

</script>

<style lang="scss" scoped>
    .paragraph{
        opacity: 0.1;
        background: green;
        position: relative;
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
    }
</style>
