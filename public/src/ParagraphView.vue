<template>

    <div class="paragraph" :class="additionalClasses">
        <p>
            {{paragraph.id}}
            <br/>
            {{paragraph.text}}

            <div v-if="paragraph.tags.images" class="images">
                <img v-for="img in paragraph.tags.images" :src='img'/>
            </div>

        </p>
    </div>

</template>

<script lang="ts" setup>

    import { PropType, computed } from 'vue';
    import {Paragraph, Tags} from "@/types";

    const props = defineProps({
        paragraph:  {
            type: Object as PropType<Paragraph>,
            required: true
        }
    })

    const additionalClasses = computed((): string[]=>{
        return (props.paragraph.tags.classNames || [])
    });

</script>

<style lang="scss" scoped>
    .paragraph{
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
            color: red;
        }
    }
</style>

