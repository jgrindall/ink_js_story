<template>
    <div>
        {{ msg }} {{ counter }} {{ store.gCount }}
    </div>

   <Wrapper :items="items">
        <template #default="{ item: item }">
            <ParagraphView v-if="(item as any).type === 'p'" :paragraph="(item as any).contents"/>
            <ChoiceView v-else-if="(item as any).type === 'c'" :choice="(item as any).contents"/>
        </template>
    </Wrapper>

    <button @click="toggleVis">Toggle</button>
    <div v-if="visible">
        <p>visible</p>
    </div>
</template>

<script lang="ts" setup>

    import {ref, onMounted, onUnmounted, PropType, computed} from "vue";
    import { storeToRefs } from 'pinia'
    import {useStore as useCounterStore} from './Counter';
    import {useStore as useStoryStore} from './Story';
    import ChoiceView from "./ChoiceView.vue";
    import ParagraphView from "./ParagraphView.vue";
    import {Paragraph} from "./types";
    import Wrapper from "./Wrapper.vue";

    const props = defineProps({
        msg:  {
            type: String,
            required: true
        }
    });

    const visible = ref(false);

    const store = useCounterStore();
    const store2 = useStoryStore();

    const { name, counter } = storeToRefs(store);
    const { paragraphs, choices } = storeToRefs(store2);

    const items = computed(() => {
        console.log(paragraphs, choices);
        const _paragraphs = paragraphs.value.map(p => {
            return {
                type:"p",
                id:p.id,
                contents: p
            }
        });
        const _choices = choices.value.map(c => {
            return {
                type:"c",
                id:c.id,
                contents: c
            }
        });
        return [
            ... _paragraphs,
            ... _choices
        ];
    });

    const toggleVis = () => {
        visible.value = !visible.value;
        store.increment();
    };

</script>
